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

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            "Content-Type": "application/json"
        },
        'body': json.dumps(getUser(event))
    }
    return response


    
#SQLの発行
def getUser(event):

    with conn.cursor() as cur:
        query = """
        SELECT
            userId,
            userName,
            DATE_FORMAT(birthday, '%%Y年%%m月%%d日') as birthday,
            sex,
            prefecture,
            introduction
        FROM
            t_user
        WHERE
            userId = %s
        ;
        """
        cur.execute(query,(event['queryStringParameters']['userId']))
        result=cur.fetchone()
    return result