# TS-Sample

## Overview

- TSNote フォルダ
  - TypeScript のサンプルコードがまとめてあります。
- Reversi フォルダ
  - アプリケーションアーキテクチャの参考としての、リバーシアプリの実装です。

## Install

- Node.js をインストールする。

  - npm が一緒に自動インストールされます。
  - nvm 等の Node.js バージョン管理ツールを使用しても可。

- Docker Desktop をインストールする。

- リポジトリをプルする。

```bash
git pull https://github.com/Gunj0/ts-sample.git
```

- パッケージを復元する。

```bash
npm install
```

- MySQL コンテナを立ち上げる。

```bash
docker-compose up -d
```

## Usage

- 任意のファイルを実行する。

```bash
npx ts-node .\TSNote\InterfaceNote.ts
```

- リバーシアプリを起動する。

```bash
npm start
```

## ライブラリ

### basic

- Node.js
  - JavaScript のランタイム

### dependencies

- express
  - Node.js の 軽量 Web アプリフレームワーク
- express-async-errors
  - Express のエラーハンドリングライブラリ
- morgan
  - Express のログ出力ライブラリ
- mysql2
  - MySQL クライアント

### devDependencies

- @types/express
  - Express の型定義パッケージ
- @types/morgan
  - Morgan の型定義パッケージ
- nodemon
  - Node.js のホットリロードツール
  - nodemon.json で設定したファイルに変更があるとコマンドを実行する
- ts-node
  - TS ファイルのまま Node.js を実行するツール
- typescript
  - JavaScript の静的型付けスーパーセット

## Author

- GitHub: [Gunj0](https://github.com/Gunj0)
- X(Twitter): [@gunjo2000](https://twitter.com/gunjo2000)
- BlueSky: [@gunj0.bsky.social](https://bsky.app/profile/gunj0.bsky.social)

## License

- [MIT license](https://en.wikipedia.org/wiki/MIT_License)
