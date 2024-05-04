# init.sqlの内容をmysqlに実行する
Get-Content .\Reversi\mysql\init.sql | docker-compose exec -T mysql mysql --user=root --password=rootpassword