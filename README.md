# Mini_TTV
Originally intended to just notify users of Twitch.tv events (such as a stream 
going live), the project has expanded to be a mini TTV player. Current 
implementation only includes the back-end functionality.
#### To-do:
- Implement REDIS to securely store user OAuth Tokens.
    - Current implementation uses Flask Session, which is not secure for public 
    use.
- Implement React front-end to interpret JSON responses.
- Implement network related error handling for non-200 responses.

### [mini_ttv.py](mini_ttv.py)
Main application file. This file configures and starts a Flask session that 
handles `/`, `/login`, `/auth`, and `/disconnect` routes for the project.

### [ttv_credentials.py](ttv_credentials.py)
Handles all authentication for the project.
- `load_client_id` and `load_client_secret` load in client information from 
ttv_client_secrets.json.
- `get_user_auth` and `get_auth_token` are responsible for making requests to
the Twitch API and handling the returned information in order to log the user 
in.
- `user_disconnect` disconnects the user and clears any user related data.

### [ttv_api_calls.py](ttv_api_calls.py)
Handles the direct interaction with the Twitch API. Contains URLS for various 
requests and returns JSON data to the caller.
- `ttv_validate_token`, `ttv_get_auth_code`, `ttv_get_auth_token` are used for 
the user authentication process.
- `ttv_total_follows` and `ttv_live_follows` get the total number of streams a 
user follows and returns a list of all __live__ streams from their follow list.
- `ttv_top_streams` and `ttv_top_games` return a JSON list of the top 20 
streams/games.

### [ttv_network_handler.py](ttv_network_handler.py)
Handles the network related functionality. Current implementation makes a 
request and simply returns the data, but error handling needs to be 
incorporated.
- `create_client_header` and `create_auth_header` generate headers for API 
calls.
- `url_redirect` redirects the caller to a specified URL.
- `url_get_json` and `url_post_json` make GET/POST requests and return JSON 
data.
- `get_params` extracts URL parameters returned by the Twitch API

### [ttv_json_handler.py](ttv_json_handler.py)
Helper function that takes in multiple JSON objects and returns a single, 
combined, JSON object with keys denoting the type of data, and values denoting 
the data provided.