import logging

from ttv_network_handler import url_redirect, create_client_header, create_auth_header, url_get_json, url_post_json

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
    validation_data = url_get_json(VALIDATE_URL, create_auth_header(token))
    return validation_data['login'], validation_data['user_id']


def ttv_get_auth_code(state, client_id):
    url = "%s&client_id=%s&state=%s" % (OAUTH_URL, client_id, state)
    logging.debug("AC Redirect: " + url)
    return url_redirect(url)


def ttv_get_auth_token(client_id, client_secret, code):
    url = "%s&client_id=%s&client_secret=%s&code=%s" % (TOKEN_URL, client_id, client_secret, code)
    logging.debug("URL: %s" % url)
    return url_post_json(url)


def ttv_total_follows(user_id, client_id):
    url = "%s%s&first=1" % (FOLLOWS_URL, user_id)
    return url_get_json(url, create_client_header(client_id))['total']


def ttv_live_follows(user_id, client_id):
    data = {}
    batch, cursor = 0, ''

    header = create_client_header(client_id)
    total = ttv_total_follows(user_id, client_id)

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
