import json, random, logging, string
from flask import session as login_session
from ttv_api_calls import ttv_get_auth_code


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

    return