# Combine the JSON responses for streams, games, follows into one JSON response with categories for each
def combine_json(state, streams=None, games=None, follows=None, *args):
    data = {}
    data.update({'login': state})
    if streams: data.update({'streams': streams})
    if games: data.update({'games': games})
    if follows: data.update({'follows': follows})
    for index, arg in args:
        data.update({index: arg})
    return data