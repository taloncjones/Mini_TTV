# Create Header based on key, value provided
def create_client_header(client_id):
    header = {"Client-ID": client_id}
    return header

def create_auth_header(token):
    header = {"Authorization": "OAuth " + token}
    return header