import logging
import json
import random
import string
from flask import Flask, redirect, url_for, request
from flask import session as login_session
import requests
from ttv_credentials import load_client_id, load_client_secret, get_user_auth, get_auth_token
from ttv_json_handler import combine_json
from ttv_network_handler import create_auth_header, create_client_header
from ttv_api_calls import ttv_validate_token, ttv_live_follows, ttv_top_games, ttv_top_streams

logging.basicConfig(filename='ttv_notifications.log', level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)

APPLICATION_NAME = 'Mini_TTV'


# Log in handler with random state generator
@app.route('/login')
def login():
    return get_user_auth()


# Auth handler for redirects after Twitch sign in
@app.route('/auth')
def authenticate():
    get_auth_token()
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
    client_id_header = create_client_header(client_id)
    json_streams = ttv_top_streams(client_id)
    json_games = ttv_top_games(client_id)
    if 'state' in login_session:
        if ttv_validate_token(login_session['access_token']):
            json_follows = ttv_live_follows(client_id_header)
            # response_follows = requests.get(FOLLOWS_URL + login_session['user_id'], headers=client_id_header)
        else:
            disconnect()
    return combine_json(state=login_session['state'] if 'state' in login_session else '',
                        streams=json_streams, games=json_games,
                        follows=json_follows if 'state' in login_session else '')


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=80)
