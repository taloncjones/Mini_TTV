import logging

from flask import Flask, redirect, url_for, render_template, request
from flask import session as login_session
from flask_cors import CORS

from ttv_api_calls import ttv_validate_token, ttv_live_follows, ttv_top_games, ttv_top_streams, ttv_get_user_info, ttv_get_game_info, ttv_get_game_viewer_info
from ttv_credentials import load_client_id, get_user_auth, get_auth_token, user_disconnect
from ttv_json_handler import combine_json

logging.basicConfig(filename='ttv_notifications.log', level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)
CORS(app)

APPLICATION_NAME = 'Mini_TTV'


def state():
    return login_session['state'] if 'state' in login_session else ''


# Add Access-Control-Allow-Credentials header
@app.after_request
def add_header(resp):
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    return resp


# Log in handler with random state generator
@app.route('/login')
def login():
    login_session['referer'] = request.headers.get("Referer")
    return get_user_auth()


# Auth handler for redirects after Twitch sign in
@app.route('/auth')
def authenticate():
    get_auth_token()
    if 'referer' in login_session and login_session['referer']:
        return redirect(login_session['referer'])
    else:
        return redirect(url_for('home_page'))


# Log out handler
@app.route('/disconnect')
def disconnect():
    referer = request.headers.get("Referer")
    if 'referer' in login_session:
        referer = login_session['referer']
    user_disconnect()
    if referer:
        return redirect(referer)
    else:
        return redirect(url_for('home_page'))


# Check cookie data
@app.route('/whoami')
def who_am_i():
    return state()


# Top streams
@app.route('/streams')
def streams():
    return ttv_top_streams(client_id=load_client_id())


# Top games
@app.route('/games')
def games():
    return ttv_top_games(client_id=load_client_id())


# Follows
@app.route('/follows')
def follows():
    if 'state' in login_session:
        try:
            login_session['login'], login_session['user_id'] = ttv_validate_token(login_session['access_token'])
            return ttv_live_follows(login_session['user_id'], client_id=load_client_id())
        except Exception as e:
            logging.debug("Error: %s" % e)
            disconnect()
    return {}


# User info
@app.route('/user/<int:user_id>')
def user(user_id):
    return ttv_get_user_info(client_id=load_client_id(), user_id=user_id)


# Game info
@app.route('/game/<int:game_id>')
def game(game_id):
    return ttv_get_game_info(client_id=load_client_id(), game_id=game_id)


# Get all game info for specified game
@app.route('/game_info/<int:game_id>')
def game_info(game_id):
    return ttv_get_game_viewer_info(client_id=load_client_id(), game_id=game_id)


# Combine all json responses
@app.route('/json')
def json():
    return combine_json(state=state(), streams=streams(), games=games(), follows=follows())


# Home page
@app.route('/')
def home_page():
    return render_template('home.html', state=state(), streams=streams(), games=games(), follows=follows())


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.session_cookie_name = "MiniTTV"
    app.run(host='0.0.0.0', port=80)
