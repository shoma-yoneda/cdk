import json
import boto3
from botocore.client import Config

def lambda_handler(event, context):
    tmpType = str(event['queryStringParameters']['contentType']).split('/')[1]
    # S3の保存先のパス
    key = "fanta/asset/picture/profile/"+str(event['queryStringParameters']['userName'])+"."+tmpType
    content_type = str(event['contentType'])
    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            "Content-Type": "application/json"
        },
        'body': generate_presigned_url(key, content_type)
    }
    return response

def generate_presigned_url(key: str, content_type: str) -> str:
    s3_client = boto3.client("s3", config=Config(signature_version="s3v4")) 
    expires_in = 60 * 2
    bucket_name = "fanta-rice-public-bucket"

    return s3_client.generate_presigned_url(
        ClientMethod="put_object",
        ExpiresIn=expires_in,
        Params={
            "Bucket": bucket_name,
            "Key": key,
            "ACL": "public-read", 
            "ContentType": content_type
        },
        HttpMethod="PUT",
    )
