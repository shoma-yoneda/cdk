# モジュール読み込み
import os
import pymysql
import sys
import logging
import json
from datetime import date, datetime

#definition
DB_HOST = os.environ["DB_ENDPOINT"]
DB_USER = os.environ["DB_USER"]
DB_PASSWORD = os.environ["DB_PASSWORD"]
DB_NAME = os.environ["DB_NAME"]

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# MySQLに接続する
# cursorclassを指定することで
# Select結果をtupleではなくdictionaryで受け取れる
try:
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME, charset='utf8', port=3306, cursorclass=pymysql.cursors.DictCursor, autocommit=True)
except:
    logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")

#lambdaが呼ばれたら実行
def lambda_handler(event, context):
    """
    This function fetches content from mysql RDS instance
    """
    postUser(event)
    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            "Content-Type": "application/json"
        },
        'body': json.dumps("OK")
    }
    return response

#SQLの発行
def postUser(event):
    body = json.loads(event['body'])
    userId = body['userId']
    userName = body['userName']
    introduction = body['introduction']
    with conn.cursor() as cur:
        query = """
        UPDATE
            t_user
        SET
            userName = CASE WHEN userName <> %s THEN %s ELSE userName END,
            introduction = %s
        WHERE
            userId = %s
        ;
        """
        cur.execute(query,(userName, userName, introduction, userId))
        conn.commit()
        
    return