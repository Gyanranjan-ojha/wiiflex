import sys
import os
import pymysql
from datetime import datetime

# Get the current script directory
script_dir = os.path.dirname(os.path.realpath(__file__))

# Add the project root to sys.path
project_root = os.path.abspath(os.path.join(script_dir, ".."))
sys.path.append(project_root)

from core.config import env_settings

mysql_settings = env_settings.mysql_env()

def create_database(db_name):
    """
    Creation of database on the basis of .env MYSQL_DB name.
    """
    try:
        mysql_conn = pymysql.connect(
            host=mysql_settings["MYSQL_HOST"],
            user=mysql_settings["MYSQL_USER"],
            password=mysql_settings["MYSQL_PASSWORD"],
            port=mysql_settings["MYSQL_PORT"],
        )
        cur = mysql_conn.cursor()
        cur.execute("SHOW DATABASES")
        dbs = []
        for i in cur.fetchall():
            dbs += i
        if db_name not in dbs:
            cur.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
            print(f"INFO - {datetime.now()} {db_name} database successfully created...")
        else:
            print(f"WARNING - {datetime.now()} {db_name} database already existed...")
        mysql_conn.close()
    except Exception as e:
        print(f"Error in create_database:{e}")

if __name__ == "__main__":

    create_database(db_name=mysql_settings['MYSQL_DB'])
