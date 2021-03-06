# Mini_TTV
Originally intended to just notify users of Twitch.tv events (such as a stream 
going live), the project has expanded to be a mini TTV player. Current implementation includes a Python Flask API back-end, with a React front-end.

__Note:__ Due to recent Twitch API changes the current implementation no longer functions as desired. Twitch is now limiting the number of API calls per minute, and navigating through game directories will very quickly exceed that limit. In the future I hope to modify the project to use webhook subscriptions, but for now I'm halting work on the project until after the Twitch revisions.

# Setup
Current implementation should be fairly plug and play. Current settings:
- React Port: 80
- Python API Port: 3000
- ./src/components/Url.json URL: 127.0.0.1:3000

## __Required:__ Update Client ID and Secret:
- Update [ttv_client_secrets.json](ttv_client_secrets.json) with the Client ID and Secret obtained from your Twitch application. If you haven't already done so, you can create one at https://dev.twitch.tv/console.

## Changing the back-end URL and Port:
- In [mini_ttv.py](mini_ttv.py), modify the following line to your desired port #:
  ```    app.run(host='0.0.0.0', port=3000)```
- In [url.json](src/components/Url.json), modify the url to your desired IP/URL. __Note:__ Do not include 'http://' or 'https://', the current implementation defaults to using 'http://' URLs.

## Changing the front-end Port:
- In [package.json](package.json), modify the following line with your desired port #:
  ```
  "scripts": {
    "start": "PORT=80 react-scripts start",
  ```

## Python dependencies:
- flask
- flask_cors

## React dependencies:
- "@material-ui/core": "^4.8.3",
- "@material-ui/icons": "^4.5.1",
- "axios": "^0.19.1",
- "react-router-dom": "^5.1.2",

## Run the project:
After updating the above files, open two terminals.
#### Terminal 1:
1. Confirm python3 and pip are installed. You may also wish to use a virtual environment.
2. [Install flask and flask_cors](https://flask.palletsprojects.com/en/1.1.x/installation/) with the following:
    ```
    pip install flask
    pip install flask_cors
    ```
3. Run the Python back-end with `python3 mini_ttv.py`.
  
    __Note:__ By default, the flask project is running in developer and debug mode. You may wish to change these.
#### Terminal 2:
1. Confirm Node.js is installed. If you haven't already, you can download it [here](https://nodejs.org/en/).
2. Update npm and install dependencies with: `npm install`
3. Run the React front-end with `sudo npm start src/App.js`

    __Note:__ Sudo is required to run on port 80 (default). If you don't have sudo access you may need to run the project on a different port.

# To-do:
- ~~Implement React front-end to interpret JSON responses.~~
- Implement network related error handling for non-200 responses.
- Change backend API calls to use subscription webhooks.
- Change frontend API calls to use backend subscription information.


# Files:
```
.
├── src                             # React src files
│   ├── components
│   │   ├── games
│   │   │   ├── GameItem.js         # Renders game card with game poster, viewer count
│   │   │   └── GameList.js         # Renders list of GameItems based on prop list provided
│   │   ├── layout
│   │   │   ├── Header.js           # Renders site header with search bar and log in button
│   │   │   ├── LayoutJoiner.js     # Renders Header and MiniDrawer into one component
│   │   │   └── MiniDrawer.js       # Renders left-side drawer with links to streams, games, follows, and about page
│   │   ├── pages
│   │   │   ├── About.js            # Renders a brief overview of the project
│   │   │   ├── LogIn.js            # Renders a login page to allow oauth login
│   │   │   ├── Stream.js           # Renders a specified stream from Twitch.tv
│   │   │   └── Welcome.js          # Renders the main page. Introduces user to site and provides a basic tour.
│   │   ├── streams
│   │   │   ├── StreamInfo.js       # Renders stream information (stream title, streamer username, streamer profile picture, and game being played)
│   │   │   ├── StreamItem.js       # Renders stream card with stream screenshot, stream status, viewer count, and StreamInfo
│   │   │   └── StreamList.js       # Renders list of StreamItems based on prop list
│   │   ├── theme
│   │   │   └── Theme.js            # Modifies MaterialUI base css and provides theme coloring
│   │   └── Url.json                # JSON file containing backend API IP for easy updates
│   ├── App.css                     # Provides some basic css for the site. Originally contained more, but CSS was removed and brought into React files.
│   ├── App.js                      # Main React front-end application
│   └── ...                         # App.test.js, index.js, etc are mostly default from create-react-app
├── mini_tv.py                      # Main Python back-end file. Creates Flask API and handles Twitch.tv API calls
├── README.md
├── ttv_api_calls.py                # Contains the functions that perform Twitch API calls and return data
├── ttv_client_secrets.json         # Contains Twitch app Client ID/Secret
├── ttv_credentials.py              # Responsible for reading ttv_client_secrets and handling the user login process
├── ttv_json_handler.py             # Combines main JSON info (top streams/games, follows) into one JSON API call
├── ttv_network_handler.py          # Responsible for generating headers and making network requests/getting JSON data
├── ttv_notifications.log           # Log file created when running mini_tv.py
└── ...
```

<img src="/screenshots/welcome/welcome1.png" alt="welcome1" width="100%" />
<div>
<img src="/screenshots/welcome/welcome2.png" alt="welcome2" width="33%" />
<img src="/screenshots/welcome/welcome3.png" alt="welcome3" width="33%" />
<img src="/screenshots/welcome/welcome4.png" alt="welcome4" width="33%" />
</div>
<br />
<div>
<img src="/screenshots/pages/login.png" alt="login" width="49%" />
<img src="/screenshots/pages/loggedin.png" alt="loggedin" width="49%">
</div>
<br />
<div>
<img src="/screenshots/pages/topgames.png" alt="topgames" width="49%" />
<img src="/screenshots/pages/topstreams.png" alt="topstreams" width="49%" />
</div>
<img src="/screenshots/pages/sidebar.png" alt="sidebar" width="300" />


# Python File Overview:
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