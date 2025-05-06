# Next.js について

## レンダリング

- CSR: Client Side Rendering
  - ブラウザ側でレンダリングする, "use client" を冒頭に付ける
- SSG: Static Site Generation
  - サーバー側でビルド時のみレンダリングする
- SSR: Server Side Rendering
  - サーバー側でリクエストの度にレンダリングする, Next13 のデフォはこれ
  - useState/useEffect 等の Hooks は使用不可
- ISR:
  - サーバー側で一定間隔でレンダリングしてキャッシュする

## Router

- App Router
  - Next13 以降, page.tsx をフォルダ階層に配置する, デフォは SSR
- Pages Router
  - sec/pages フォルダ階層に任意ファイルを配置する, CSR/SSR を記述する

## VSCode 拡張機能

- ES7+ React/〜: コード補完, 「rafce」でデフォルトエクスポート
- Auto Rename tag: 関連タグを自動リネームしてくれる
- Auto Close tag: 関連タグを自動で閉じてくれる
- Prettier: 整形ツール
