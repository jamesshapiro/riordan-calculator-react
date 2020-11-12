import json
import boto3

client = boto3.client('dynamodb')

def sequence_id_is_valid(sequence_id):
    if not sequence_id.startswith('A'):
        return False
    if len(sequence_id) != 7:
        return False
    if not all([c in '0123456789' for c in sequence_id[1:]]):
        return False
    return True

def lambda_handler(event, context):
    print(event)
    if 'queryStringParameters' not in event or 'sequence' not in event['queryStringParameters']:
        return {
            'statusCode': 400,
            'body': json.dumps('Bad Request: requests must be of the form: https://fh3cm0x1k4.execute-api.us-east-1.amazonaws.com/prod/getsequence?sequence=A010000')
        }
    
    sequence_id = event['queryStringParameters']['sequence']
    if not sequence_id_is_valid(sequence_id):
        return {
            'statusCode': 400,
            'body': json.dumps('Bad Request: sequence IDs must be of the form: A010000')
        }
    response = client.get_item(
        TableName='riordan_calculator',
        Key={
            'OEIS_ID': {
                'S': sequence_id,
            }
        }
    )
    print(response)
    if 'Item' not in response:
        return {
            'statusCode': 404,
            'body': json.dumps('Bad Request: sequence not found')
        }
    
    item = response['Item']
    oeis_id = item['OEIS_ID']['S']
    oeis_name = item['OEIS_NAME']['S']
    oeis_sequence = json.loads('[' + item['OEIS_SEQUENCE']['S'] + ']')
    payload = {
        'oeis_id': oeis_id,
        'oeis_name': oeis_name,
        'oeis_sequence': oeis_sequence
    }
    return {
        'statusCode': 200,
        'body': json.dumps(payload)
    }
