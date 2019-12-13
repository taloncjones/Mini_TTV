import logging

from ttv_network_handler import url_redirect, create_client_header, create_auth_header, url_get_json, url_post_json, create_bearer_header

OAUTH_URL = "https://id.twitch.tv/oauth2/authorize?response_type=code" \
            "&redirect_uri=http://127.0.0.1/auth" \
            "&scope=user_read"
TOKEN_URL = "https://id.twitch.tv/oauth2/token?grant_type=authorization_code" \
            "&redirect_uri=http://127.0.0.1/auth"
GAMES_URL = "https://api.twitch.tv/helix/games/top?"
STREAMS_URL = "https://api.twitch.tv/helix/streams?"
FOLLOWS_URL = "https://api.twitch.tv/helix/users/follows?from_id="
VALIDATE_URL = "https://id.twitch.tv/oauth2/validate"
USER_URL = "https://api.twitch.tv/helix/users?id="
MY_URL = "https://api.twitch.tv/helix/users"
GAME_URL = "https://api.twitch.tv/helix/games?id="


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


def ttv_get_my_info(token, client_id):
    url = f"{MY_URL}"
    header = create_client_header(client_id)
    header.update(create_bearer_header(token))
    logging.debug(f"Self lookup: {url} Header: {header}")
    return url_get_json(url, header)


def ttv_get_user_info(client_id, user_id):
    url = f"{USER_URL}{user_id}"
    logging.debug(f"User lookup: {url}")
    return url_get_json(url, create_client_header(client_id))


def ttv_get_game_info(client_id, game_id):
    url = f"{GAME_URL}{game_id}"
    logging.debug(f"Game lookup: {url}")
    return url_get_json(url, create_client_header(client_id))


def ttv_get_game_viewer_info(client_id, game_id):
    url = f"{STREAMS_URL}game_id={game_id}&first=100"
    logging.debug(f"Game viewer count lookup: {url}")
    return url_get_json(url, create_client_header(client_id))


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
        user_list = ""

        url = "%s&after=%s" % (default_url, cursor) if cursor else default_url
        follow_json_response = url_get_json(url, header)

        for streamer in follow_json_response['data']:
            user_list += "user_id=%s&" % streamer['to_id']

        live_json_response = url_get_json(STREAMS_URL + user_list[:-1], header)
        live_streams = live_json_response['data']
        data.update({"page%s" % int((batch / 100) + 1): live_streams})

        cursor = live_json_response['pagination']['cursor']
        batch += 100

    return data


def ttv_top_streams(client_id):
    return url_get_json(STREAMS_URL, create_client_header(client_id))


def ttv_top_games(client_id):
    return url_get_json(GAMES_URL, create_client_header(client_id))
