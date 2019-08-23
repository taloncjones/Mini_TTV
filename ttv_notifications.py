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

oauth_url = "https://id.twitch.tv/oauth2/authorize?response_type=code&redirect_uri=http://127.0.0.1/auth&scope=user_follows_edit"
games_url = "https://api.twitch.tv/helix/games/top?first=10"
streams_url = "https://api.twitch.tv/helix/streams?first=10"
follows_url = "https://api.twitch.tv/helix/users/follows?from_id="

# Load Twitch App Client-ID from ttv_client_secrets.json and return header with client ID
def loadClientID():
    app_id = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_id']
    login_session['client-id'] = app_id
    header = {"Client-ID": "%s" % app_id}
    return header


# Load Twitch App Client-Secret from ttv_client_secrets.json and return header with client secret
def loadClientSecret():
    app_secret = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_secret']
    secret = {"Client-Secret": "%s" % app_secret}
    return secret


# Combine the JSON responses for streams, games, follows into one JSON response with categories for each
def combineJSON(state, streams=None, games=None, follows=None):
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
    url = "%s&client_id=%s&state=%s" % (oauth_url, login_session['client-id'], login_session['state'])
    logging.debug("URL: %s" % url)
    return redirect(url)


# Auth handler for redirects after Twitch sign in
@app.route('/auth')
def authenticate():
    logging.debug("Received Auth")
    state = request.args.get('state')
    if 'state' in login_session and login_session['state'] == state:
        code = request.args.get('code')
        scope = request.args.get('scope')
    else:
        pass
        # User not logged in or state != session state (manual /auth call)
    return redirect(url_for('homePage'))


# Log out handler
@app.route('/disconnect')
def disconnect():
    logging.debug("Received Logout Request")
    if 'state' in login_session:
        del login_session['state']
    return redirect(url_for('homePage'))


# Home page
@app.route('/')
def homePage():
    client_id_header = loadClientID()
    response_streams = requests.get(streams_url, headers=client_id_header)
    response_games = requests.get(games_url, headers=client_id_header)
    return combineJSON(state=login_session['state'] if 'state' in login_session else '',
                       streams=response_streams, games=response_games)


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=80)