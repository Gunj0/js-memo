# init.sqlの内容をmysqlに実行する
Get-Content ..\30_reversi\mysql\init.sql | docker-compose exec -T mysql mysql --user=root --password=rootpassword