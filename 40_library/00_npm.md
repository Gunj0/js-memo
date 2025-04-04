# npm

## npm とは

- Node.js 標準のライブラリパッケージマネージャ

## コマンド

- 初期設定(package.json 生成)
  - `npm init`
- インストール
  - `npm install {パッケージ名}`
    - `--save-dev` で開発用インストール
    - `-g` でグローバルインストール（基本的には非推奨）
- パッケージ復元
  - `npm install`
    - package.json から node_modules の中身を再作成する
- 実行
  - `npx {パッケージ等}`
    - 直接実行できる

## アップデート

- `npm outdated`
  - 各パッケージの最新バージョンが表示される
- `npm update`
  - package.json 記述範囲内でアップデートする
- `npm i next@latest`
  - 特定のパッケージを最新化する場合
