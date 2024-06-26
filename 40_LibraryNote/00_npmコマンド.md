# コマンド

- 初期設定(package.json 生成)
  - npm init
- インストール
  - npm install {パッケージ名}
    - --save-dev で開発用インストール
    - -g でグローバルインストールできるが非推奨
- 復元
  - npm install
    - package.json から node_modules の中身を再作成する
- 実行
  - npx {パッケージ等}
    - 直接実行できる
