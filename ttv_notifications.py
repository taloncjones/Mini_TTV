# File: ttv_notifications.py
# Use: Gets Twitch TV notifications
# Author: Talon Jones

# Purpose: Use Twitch API to receive notifications, host on Heroku to periodically pull updates

import logging
import json
from flask import Flask, render_template
from flask import session as login_session
import requests

logging.basicConfig(filename='ttv_notifications.log', level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)

APPLICATION_NAME = 'TTV_Notifications'

games_url = "https://api.twitch.tv/helix/games/top?first=10"
streams_url = "https://api.twitch.tv/helix/streams?first=10"
follow_url = "https://api.twitch.tv/helix/users/follows?from_id="

# Load Twitch App Client-ID from ttv_client_secrets.json and return header with client ID
def loadClientID():
    app_id = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_id']
    header = {"Client-ID": "%s" % app_id}
    return header

def loadClientSecret():
    app_secret = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_secret']
    secret = {"Client-Secret": "%s" % app_secret}
    return secret

@app.route('/')
def splashPage():
    client_id_header = loadClientID()
    response_streams = requests.get(streams_url, headers=client_id_header)
    response_games = requests.get(games_url, headers=client_id_header)
    return "%s\n%s" % (response_streams.json(), response_games.json())

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=80)