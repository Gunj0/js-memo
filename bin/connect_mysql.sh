#!/bin/bash
docker-compose exec mysql mysql --user=reversi --password=password reversi

# mysqlコンテナ内で、mysqlコマンドでuserとpassとテーブル名を指定して接続する