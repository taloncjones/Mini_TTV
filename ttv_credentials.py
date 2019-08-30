import json


# Load Twitch App Client-ID from ttv_client_secrets.json and return header with client ID
def load_client_id():
    app_id = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_id']
    return app_id


# Load Twitch App Client-Secret from ttv_client_secrets.json and return header with client secret
def load_client_secret():
    app_secret = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_secret']
    return app_secret
