import json
import logging
import requests

from ttv_network_handler import url_redirect, create_client_header, create_auth_header

OAUTH_URL = "https://id.twitch.tv/oauth2/authorize?response_type=code" \
            "&redirect_uri=http://127.0.0.1/auth" \
            "&scope=user_read"
TOKEN_URL = "https://id.twitch.tv/oauth2/token?grant_type=authorization_code" \
            "&redirect_uri=http://127.0.0.1/auth"
GAMES_URL = "https://api.twitch.tv/helix/games/top?"
STREAMS_URL = "https://api.twitch.tv/helix/streams?"
FOLLOWS_URL = "https://api.twitch.tv/helix/users/follows?from_id="
VALIDATE_URL = "https://id.twitch.tv/oauth2/validate"


def ttv_validate_token(token):
    validate_response = requests.get(VALIDATE_URL, headers=create_auth_header(token))
    v_data = validate_response.json()
    return (v_data['login'], v_data['user_id'])


def ttv_get_auth_code(state, client_id):
    url = "%s&client_id=%s&state=%s" % (OAUTH_URL, client_id, state)
    logging.debug("AC Redirect: " + url)
    return url_redirect(url)


def ttv_total_follows(user_id, client_id):
    url = "%s%s&first=1" % (FOLLOWS_URL, user_id)
    json_response = requests.get(url, headers=create_client_header(client_id)).json()
    logging.debug("Total: " + json.dumps(json_response))
    total = json_response['total']
    return total


def ttv_live_follows(user_id, client_id):
    data = {}
    batch, cursor = 0, ''

    header = create_client_header(client_id)
    total = ttv_total_follows(header)

    default_url = "%s%s&first=100" % (FOLLOWS_URL, user_id)

    while batch <= total:
        url = "%s&after=%s" % (default_url, cursor) if cursor else default_url
        json_response = requests.get(url, headers=header).json()

        user_list = ""

        for streamer in json_response['data']:
            user_list += "user_id=%s&" % streamer['to_id']

        json_response = requests.get(STREAMS_URL + user_list[:-1], headers=header).json()
        live_streams = json_response['data']
        data.update({"page%s" % int((batch / 100) + 1): live_streams})

        cursor = json_response['pagination']['cursor']
        batch += 100

    return data


def ttv_top_streams(client_id):
    return requests.get(STREAMS_URL, headers=create_client_header(client_id)).json()


def ttv_top_games(client_id):
    return requests.get(GAMES_URL, headers=create_client_header(client_id)).json()
