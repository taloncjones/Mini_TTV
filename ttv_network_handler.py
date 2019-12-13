import logging

import requests
from flask import redirect, request


# Create header for client-id
def create_client_header(client_id):
    header = {"Client-ID": client_id}
    return header


# Create header for auth token
def create_auth_header(token):
    header = {"Authorization": "OAuth " + token}
    return header


# Create header for bearer token
def create_bearer_header(token):
    header = {"Authorization": "Bearer " + token}
    return header


# Redirect to URL
def url_redirect(url):
    logging.debug("Redirected to: " + url)
    return redirect(url)


def url_get_json(url, header=""):
    return requests.get(url, headers=header).json()


def url_post_json(url, header=""):
    return requests.post(url, headers=header).json()


def get_params():
    return request.args
