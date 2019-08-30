import logging
import json
import random
import string
from flask import Flask, redirect, url_for, request
from flask import session as login_session
import requests
from ttv_credentials import load_client_id, load_client_secret
from ttv_json_handler import combine_json
from ttv_network import create_auth_header, create_client_header

logging.basicConfig(filename='ttv_notifications.log', level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)

APPLICATION_NAME = 'TTV_Notifications'

OAUTH_URL = "https://id.twitch.tv/oauth2/authorize?response_type=code" \
            "&redirect_uri=http://127.0.0.1/auth" \
            "&scope=user_read"
TOKEN_URL = "https://id.twitch.tv/oauth2/token?grant_type=authorization_code" \
            "&redirect_uri=http://127.0.0.1/auth"
GAMES_URL = "https://api.twitch.tv/helix/games/top?"
STREAMS_URL = "https://api.twitch.tv/helix/streams?"
FOLLOWS_URL = "https://api.twitch.tv/helix/users/follows?from_id="
VALIDATE_URL = "https://id.twitch.tv/oauth2/validate"


# Validate the current access token loaded from login_session['access_token']
def validate_access_token():
    validate_response = requests.get(VALIDATE_URL, headers=load_access_token())
    v_data = validate_response.json()
    logging.debug(v_data)

    if 'status' in v_data and v_data['status'] == 401:
        return False

    login_session['login'], login_session['user_id'] = v_data['login'], v_data['user_id']
    logging.debug("User Info: %s, %s" % (login_session['login'], login_session['user_id']))
    return True


def get_total_follows(header):
    url = "%s%s&first=1" % (FOLLOWS_URL, login_session['user_id'])
    json_response = requests.get(url, headers=header).json()
    total = json_response['total']
    return total


def get_live_follows(header):
    data = {}
    batch, cursor = 0, ''

    total = get_total_follows(header)
    logging.debug("Total: %s" % total)

    default_url = "%s%s&first=100" % (FOLLOWS_URL, login_session['user_id'])

    while batch <= total:
        url = "%s&after=%s" % (default_url, cursor) if cursor else default_url
        json_response = requests.get(url, headers=header).json()

        user_list = ""

        for streamer in json_response['data']:
            user_list += "user_id=%s&" % streamer['to_id']

        json_response = requests.get(STREAMS_URL + user_list[:-1], headers=header).json()
        live_streams = json_response['data']
        data.update({ "page%s" % int((batch/100)+1) : live_streams })

        cursor = json_response['pagination']['cursor']
        batch += 100

    logging.debug(data)
    return data


# Log in handler with random state generator
@app.route('/login')
def login():
    state = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(30))
    login_session['state'] = state

    logging.debug("Received Login Request")
    url = "%s&client_id=%s&state=%s" % (OAUTH_URL, load_client_id(), login_session['state'])
    logging.debug("URL: %s" % url)
    return redirect(url)


# Auth handler for redirects after Twitch sign in
@app.route('/auth')
def authenticate():
    logging.debug("Received Auth")
    logging.debug(request.args)
    state = request.args.get('state')

    if ('state' not in login_session) or ('state' in login_session and login_session['state'] != state):
        # Insert error condition. User not logged in or state != session state (manual /auth call)
        pass

    code = request.args.get('code')
    url = "%s&client_id=%s&client_secret=%s&code=%s" % (TOKEN_URL, load_client_id(),
                                                        load_client_secret(), code)
    logging.debug("URL: %s" % url)
    token_response = requests.post(url)

    logging.debug(token_response.text)
    json_response = json.loads(token_response.text)

    access_token, expires_in, refresh_token = json_response['access_token'],\
                                              json_response['expires_in'],\
                                              json_response['refresh_token']
    logging.debug("AT: %s\nEx: %s\nRT: %s" % (access_token, expires_in, refresh_token))

    login_session['access_token'] = access_token
    login_session['token_expiration'] = expires_in
    login_session['refresh_token'] = refresh_token

    return redirect(url_for('home_page'))


# Log out handler
@app.route('/disconnect')
def disconnect():
    logging.debug("Received Logout Request")
    if 'state' in login_session:
        login_session.clear()
    return redirect(url_for('home_page'))


# Home page
@app.route('/')
def home_page():
    client_id = load_client_id()
    client_id_header = create_header("Client-ID", client_id)
    response_streams = requests.get(STREAMS_URL, headers=client_id_header)
    response_games = requests.get(GAMES_URL, headers=client_id_header)
    if 'state' in login_session:
        if validate_access_token():
            response_follows = get_live_follows(client_id_header)
            # response_follows = requests.get(FOLLOWS_URL + login_session['user_id'], headers=client_id_header)
        else:
            disconnect()
    return combine_json(state=login_session['state'] if 'state' in login_session else '',
                        streams=response_streams, games=response_games,
                        follows=response_follows if 'state' in login_session else '')


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=80)
