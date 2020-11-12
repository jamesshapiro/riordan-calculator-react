import sys
import boto3

# Note: you can download the entire OEIS dataset from here:
# https://oeis.org/wiki/Welcome#Compressed_Versions

client = boto3.client('dynamodb')

with open('data/oeis.txt') as f1:
    sequences = f1.readlines()

with open('data/names.txt') as f2:
    sequence_names = f2.readlines()

offset = 4

def get_put_request_json(id, sequence_name, sequence):
    return {
        'PutRequest': {
            'Item': {
                'OEIS_ID': {
                    'S': id,
                },
                'OEIS_NAME': {
                    'S': sequence_name
                },
                'OEIS_SEQUENCE': {
                    'S': sequence
                }
            }
        }
    }

def batch_write_items(put_requests):
    response = client.batch_write_item(
        RequestItems={
            'riordan_calculator': put_requests
        }
    )

sequence_name_map = {}
put_requests = []

for line in sequence_names[offset:]:
    sequence_id, sequence_name = line.split(' ', 1)
    sequence_name = sequence_name.strip()
    sequence_name_map[sequence_id] = sequence_name

for idx, line in enumerate(sequences[offset:]):
    id, sequence = line.split()
    sequence_name = sequence_name_map[id]
    sequence = ','.join(sequence.strip().split(',')[1:-1])
    put_request_json = get_put_request_json(id, sequence_name, sequence)
    put_requests.append(put_request_json)
    if len(put_requests) == 25:
        batch_write_items(put_requests)
        put_requests = []
        print(f'{idx+1}/{len(sequences) - offset}')

if len(put_requests) > 0:
    batch_write_items(put_requests)

print(len(sequences))
