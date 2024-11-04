# JavaScript

## JavaScript について

- ECMA によって仕様が策定される(ECMAScript)
  - 仕様を実装するかはブラウザごとに委ねられている
- 実装状況は以下で確認できる
  - [ECMAScript](https://compat-table.github.io/compat-table/esnext/)
  - [CanIUse](https://caniuse.com/)
- モダン記法は ES6 = ES2015 以降で実装された
  - let と const
  - テンプレート文字列
  - アロー関数
  - 分割代入
  - スプレッド構文
  - class
  - Promise

## データ型

- 数値
  - number: 1, 6.2, -10
- 文字列
  - string: 'Hi', "Hi", `Hi`
- 論理値
  - boolean: true, false
- 配列
  - Array: [1, 2, 3]
- オブジェクト
  - object: {name: 'test', age: 30}

## Tips

- html で defer をつけると html のあとに読み込みできる

```html
<script src="app.js" defer></script>
```

## トランスパイラ

- トランスパイラとは
  - 新しい JS 記法を古い記法に変換するツール
- ツール
  - Babel
    - webpack や Parcel に統合されている
    - [Babel REPL](https://bvaughn.github.io/babel-repl/)
      - コンパイル結果を確認できるサイト
  - SWC
    - Next.js に統合されている

## モジュールバンドラー

- モジュールバンドラーとは
  - 複数の js/css/image ファイルを 1 つにまとめてビルドするツール
  - パフォーマンスがよくなる
- ツール
  - webpack
  - Vite

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

## 参考文献

- React ハンズオンラーニング 第 2 版 v
  - オライリー出版, Alex Banks/Eve Porcello 著
