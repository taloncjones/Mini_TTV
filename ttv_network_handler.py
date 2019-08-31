from flask import redirect, request
import logging

# Create header for client-id
def create_client_header(client_id):
    header = {"Client-ID": client_id}
    return header


# Create header for auth token
def create_auth_header(token):
    header = {"Authorization": "OAuth " + token}
    return header


# Redirect to URL
def url_redirect(url):
    logging.debug("Redirected to: " + url)
    return redirect(url)


def get_params():
    return request.args