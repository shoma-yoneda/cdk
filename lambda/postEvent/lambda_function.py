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
    postEvent(event)
    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT',
            "Content-Type": "application/json"
        },
        'body': json.dumps("OK")
    }
    return response

#SQLの発行
def postEvent(event):
    if isinstance(event['body'], str):
        items = json.loads(event['body'])
    else:
        items = event['body']


    with conn.cursor() as cur:
        for item in items:
            query = """
            INSERT INTO t_event
                (
                host,
                category,
                eventArea,
                access,
                mapUrl,
                ticket,
                eventName,
                eventSpot,
                eventStartDate,
                eventEndDate,
                eventTime,
                guest,
                price,
                ticketUrl,
                eventUrl,
                eventDetail,
                exId
                )
            VALUES
                (
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s
                )
            ON DUPLICATE KEY
            UPDATE
                exId = VALUES(exId)
            ;
            """
            cur.execute(query,(
                            item['host'],
                            item['category'],
                            item['eventArea'],
                            item['access'],
                            item['mapUrl'],
                            item['ticket'],
                            item['eventName'],
                            item['eventSpot'],
                            item['eventStartDate'],
                            item['eventStartDate'],
                            item['eventTime'],
                            item['guest'],
                            item['price'],
                            item['ticketUrl'],
                            item['ticketUrl'],
                            item['eventDetail'],
                            item['exId']
                            )
            )
        conn.commit()
    return