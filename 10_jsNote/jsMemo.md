# Memo

## ECMAScript

- JavaScript の標準規格
- FS6=ES2015 でモダン機能が追加された
  - let, const
  - アローファンクション
  - class
  - 分割代入
  - テンプレート文字列
  - スプレッド構文
  - Promise

## モジュールバンドラー

- 複数の js/css/image ファイルを 1 つにまとめてビルドするツール
  - パフォーマンスがよくなる
- ツール
  - webpack
  - Vite

## トランスパイラ

- 新しい JS 記法を古い記法に変換するツール
- ツール
  - BABEL
  - SWC
    - Next.js の中で使用している

## 仮想 DOM

- DOM: Document Object Model とは
  - HTML などを解釈して木構造で表現したもの
  - 直接操作するとレンダリングコストが高い
- 仮想 DOM
  - JS 上で仮想 DOM を操作して差分を DOM に反映すること

## SPA: Single Page Application

- HTML1 つで、JS で画面を書き換える
  - ページ遷移でちらつきがなくなる
  - 表示速度がアップしてユーザー体験向上
  - コンポーネント分割が容易になり開発効率アップ
