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
    # datetime型を含むitem
    item = getComment(event)
    
    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            "Content-Type": "application/json"
        },
        'body': json.dumps(item, default=json_serial)
    }
    return response

#SQLの発行
def getComment(event):
    with conn.cursor() as cur:
        query = """
        SELECT
            comment.comment,
            comment.userId,
            user.userName,
            comment.createdDate
        FROM
            t_comment comment
        INNER JOIN
            t_user user
        ON
            comment.userId = user.userId
        WHERE
            comment.eventId = %s
        ;
        """
        cur.execute(query,(event['queryStringParameters']['eventId']))
        result=cur.fetchall()
    return result

# date, datetimeの変換関数
def json_serial(obj):
    # 日付型の場合には、文字列に変換します
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    # 上記以外はサポート対象外.
    raise TypeError ("Type %s not serializable" % type(obj))
