# Create header for client-id
def create_client_header(client_id):
    header = {"Client-ID": client_id}
    return header


# Create header for auth token
def create_auth_header(token):
    header = {"Authorization": "OAuth " + token}
    return header