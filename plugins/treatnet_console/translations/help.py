import json

with open('pl-PL.json') as f:
    data = json.load(f)
    for message_key in data['messages']:
        if isinstance(data['messages'][message_key], dict):
          data['messages'][message_key] = data['messages'][message_key].get('text', '')

with open('pl-PL2.json', 'w') as outfile:
  json.dump(data, outfile)
