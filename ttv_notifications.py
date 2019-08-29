# File: ttv_notifications.py
# Use: Gets Twitch TV notifications
# Author: Talon Jones

# Purpose: Use Twitch API to receive notifications, host on Heroku to periodically pull updates

import logging
import json
import random
import string
from flask import Flask, render_template, redirect, url_for, request
from flask import session as login_session
import requests

logging.basicConfig(filename='ttv_notifications.log', level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)

APPLICATION_NAME = 'TTV_Notifications'

OAUTH_URL = "https://id.twitch.tv/oauth2/authorize?response_type=code" \
            "&redirect_uri=http://127.0.0.1/auth" \
            "&scope=user_follows_edit user_read"
TOKEN_URL = "https://id.twitch.tv/oauth2/token?grant_type=authorization_code" \
            "&redirect_uri=http://127.0.0.1/auth"
GAMES_URL = "https://api.twitch.tv/helix/games/top?first=10"
STREAMS_URL = "https://api.twitch.tv/helix/streams?first=10"
FOLLOWS_URL = "https://api.twitch.tv/helix/users/follows?from_id="
VALIDATE_URL = "https://id.twitch.tv/oauth2/validate"


# Load Twitch App Client-ID from ttv_client_secrets.json and return header with client ID
def load_client_id():
    app_id = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_id']
    login_session['client_id'] = app_id
    header = {"Client-ID": "%s" % app_id}
    return header


# Load Twitch App Client-Secret from ttv_client_secrets.json and return header with client secret
def load_client_secret():
    app_secret = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_secret']
    return app_secret


# Load Access Token from login_session['access_token'] and return OAuth header
def load_access_token():
    header = {"Authorization": "OAuth %s" % login_session['access_token']}
    return header


# Validate the current access token loaded from login_session['access_token']
@app.route('/authenticate')
def validate_access_token():
    validate_response = requests.get(VALIDATE_URL, headers=load_access_token())
    logging.debug(validate_response.text)
    return


# Combine the JSON responses for streams, games, follows into one JSON response with categories for each
def combine_json(state, streams=None, games=None, follows=None):
    data = {}
    data.update({'login': state})
    if streams: data.update({'streams': streams.json()})
    if games: data.update({'games': games.json()})
    if follows: data.update({'follows': follows.json()})
    return data


# Log in handler with random state generator
@app.route('/login')
def login():
    state = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(30))
    login_session['state'] = state
    logging.debug("Received Login Request")
    url = "%s&client_id=%s&state=%s" % (OAUTH_URL, login_session['client_id'], login_session['state'])
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
    url = "%s&client_id=%s&client_secret=%s&code=%s" % (TOKEN_URL, login_session['client_id'],
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
        del login_session['state']
    return redirect(url_for('home_page'))


# Home page
@app.route('/')
def home_page():
    client_id_header = load_client_id()
    response_streams = requests.get(STREAMS_URL, headers=client_id_header)
    response_games = requests.get(GAMES_URL, headers=client_id_header)
    return combine_json(state=login_session['state'] if 'state' in login_session else '',
                        streams=response_streams, games=response_games)


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=80)
