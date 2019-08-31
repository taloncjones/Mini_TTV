import json, random, logging, string
from flask import session as login_session
from ttv_api_calls import ttv_get_auth_code, ttv_get_auth_token
from ttv_network_handler import get_params


# Load Twitch App Client-ID from ttv_client_secrets.json and return client ID
def load_client_id():
    app_id = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_id']
    return app_id


# Load Twitch App Client-Secret from ttv_client_secrets.json and return client secret
def load_client_secret():
    app_secret = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_secret']
    return app_secret


def get_user_auth():
    state = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(30))
    login_session['state'] = state

    logging.debug("Received Login Request. State: %s" % login_session['state'])
    return ttv_get_auth_code(state, load_client_id())


def get_auth_token():
    logging.debug("Received Auth")
    params = get_params()
    state = params.get('state')

    if ('state' not in login_session) or ('state' in login_session and login_session['state'] != state):
        # Insert error condition. User not logged in or state != session state (manual /auth call)
        pass

    code = params.get('code')
    json_response = ttv_get_auth_token(load_client_id(), load_client_secret(), code)

    access_token, expires_in, refresh_token = json_response.get('access_token'), \
                                              json_response.get('expires_in'), \
                                              json_response.get('refresh_token')
    logging.debug("AT: %s\nEx: %s\nRT: %s" % (access_token, expires_in, refresh_token))

    login_session['access_token'] = access_token
    login_session['token_expiration'] = expires_in
    login_session['refresh_token'] = refresh_token
    return