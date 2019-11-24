import logging

from flask import Flask, redirect, url_for
from flask import session as login_session

from ttv_api_calls import ttv_validate_token, ttv_live_follows, ttv_top_games, ttv_top_streams
from ttv_credentials import load_client_id, get_user_auth, get_auth_token, user_disconnect
from ttv_json_handler import combine_json

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
    user_disconnect()
    return redirect(url_for('home_page'))


# Top streams
@app.route('/streams/json')
def streams():
    return ttv_top_streams(client_id=load_client_id())


# Top games
@app.route('/games/json')
def games():
    return ttv_top_games(client_id=load_client_id())


# Follows
@app.route('/follows/json')
def follows():
    if 'state' in login_session:
        try:
            login_session['login'], login_session['user_id'] = ttv_validate_token(login_session['access_token'])
            return ttv_live_follows(login_session['user_id'], client_id=load_client_id())
        except Exception as e:
            logging.debug("Error: %s" % e)
            disconnect()
    return {}

# Home page
@app.route('/json')
def home_page():
    return combine_json(state=login_session['state'] if 'state' in login_session else '',
                        streams=streams(), games=games(),
                        follows=follows())


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=80)
