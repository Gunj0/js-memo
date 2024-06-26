# TypeScript

## 参考

- Udemy: Understand TypeScript

## 利点

- 型を使用でき、開発時に間違いに気づきやすく、実行時エラーを未然に防げる。
- 新しい記法を使用して、古い JS 記法にコンパイルすることができる。

## 使い方

1. Node.js インストール
2. npm install -g typescript で TypeScript インストール
3. tsc --init で設定ファイル tsconfig.json を生成する
4. tsc で ts を js にコンパイル

## 型指定

- object 型以外
  let num: number;

- object 型
  const person: {
  name: string;
  age: number;
  }

## 基本の独自型

- Tuple 型: 個別の要素に型指定可能な長さ固定の配列
  const role: [number, string];

- Enum 型: 列挙型。複数の定数をまとめる。
  enum Role { ADMIN, READ_ONLY, };
  enum Role { ADMIN = 5, READ_ONLY, } // READ_ONLY は自動で 6 になる
  enum Role { ADMIN = 'hoge', READ_ONLY = 10, } // 文字列でも可

- any 型: 型を指定しない。基本は使用しない。
  let input: any[];

- Union 型: 型を複数指定する。
  let input: number | string;

- Literal 型: 特定の値自体を指定する。
  let input: 2 | '';

- alias 型: 型をまとめて別名で定義する。
  type Combinable = number | string;
  let result: Combinable;

- void 型: 関数が何も返さないことを示す。
  function add(n1: number, n2: number): void {
  console.log(n1 + n2);
  }

- Function 型: 関数を格納する変数を定義する。
  let conbine: Function;
  引数と返り値を指定することもできる。
  let conbine: (a: number, b: number) => number;

- unknown 型: 何でも代入できるが、他の変数への代入時にチェックを強制できる。
  let input: unknown;
  let name: string;
  if(typeof input === 'string'){ // これを書かないとコンパイルエラーになる
  name = input;
  }

- never 型: エラー発生時等、関数が絶対何も返さないことを明示する。
  function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
  }

## Tips

- コールバック関数
  function add(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
  }

  add(10, 20, (result) => {console.log(result)});

- 個別コンパイル
  ターミナルで tsc {ts ファイル}

- 自動コンパイル監視
  ターミナルで tsc {ts ファイル} -w (もしくは--watch)
  ts.config があれば、tsc -w だけで OK

## より良い書き方

- 変数を初化して宣言する場合、型推論が働くので、型を明示するのは冗長
  let num = 12;
  const person: {
  name: string;
  age: number;
  } = {
  name: 'mori',
  age: 31,
  }

- 初期化しない変数や引数は、型推論できないので型を明示したほうがよい
  let num: number;
  const person: {
  name: string;
  age: number;
  }

## tsconfig.js

- ファイル生成
  tsc --init で生成できる

- コンパイル除外オプション
  "compilerOptions": {},
  "exclude": [
  "analytics.ts", // 1 ファイルのみの場合
  "*.dev.ts" // ワイルドカード
  "**/*.dev.ts" // 全てのフォルダで適用される
  "node_module" // exclude を書かなければデフォルトで除外されている
  ]

- コンパイルに含むオプション
  "compilerOptions": {},
  "include": [
  "app.ts" // 特定のファイル・フォルダのみを対象とする
  ]
  "files": [
  "app.ts" // ファイル指定のみ。基本使用しない
  ]

- コンパイルオプション
  "compilerOptions": {
  "target": "es6", // どの js バージョンに変換するか。サジェストで選択可能。
  "module": "commonjs", // 複数の ts ファイルを繋げて利用する。
  "lib": "", // ts ファイルでどのオブジェクトを使用できるかの設定。DOM 等。
  "souceMap": "true", // js と ts のソースの関連付けをした.js.map でブラウザデバッグができる。
  "outDir": "./dist", // js ファイルの出力先設定。ts と同じフォルダ構成で出力できる。
  "rootDir": "./src", // ts ファイルの格納先設定。
  "removeComments": true, // コメントを削除する。
  "strict": true, // 全てのコンパイルチェックを有効にする(中身は tsconfig 参照)
  },

## クラス(これ自体は JS にもある)

- 記法
  class Department {
  private name: string; // クラス内のみアクセス可
  protected old: number; // 継承先クラスからもアクセス可
  public employees: string[]; // 修飾子をつけないとこっち
  private readonly id: number; // 初期化のみ可

      constructor(n: string){ // コンストラクタ
        this.name = n;
      }

      describe(){
        console.log(name);
      }

  }

- 継承

  - 基本
    class ITDepartment extends Department {
    }
  - 継承元のコンストラクタを上書きする場合
    class ITDepartment extends Department {
    constructor(n: string, admin: string){ // admin はこのクラスのみの引数
    super(n, 'IT'); // 継承元のコンストラクタへ渡す引数
    }
    }
  - メソッド、プロパティの override は同じ名前を書くだけで OK

- getter, setter: プロパティ取得や設定時に処理を同時実行する
  class Hoge {
  public lastReport: string;

      get recentReport() {
        if (this.lastReport) {
          return this.lastReport;
        }
        throw new Error('レポートが見つかりません。');
      }

      set recentReport(value: string) {
        if (!value) {
          throw new Error('正しい値を設定してください');
        }
        addReport(value);
      }

      addReport(){
      }

  }

- 静的メソッド、静的プロパティ: インスタンス化せずにアクセス可
  class Hoge {
  static fiscalYear = 2024;
  static create(name: string) {
  return name + 'さん';
  }
  }

- 抽象メソッド: 継承先での上書きを強制する
  abstract class Hoge { // インスタンス化はできなくなる
  protected name: string;
  abstract describe { // 中身は書けない
  }
  }

- シングルトン: 1 つのインスタンスのみを許可するパターン
  class Department {
  private static instance: Department; // クラスインスタンス
  name: string;

      private constructor(name: string){   // 外からアクセス不可
        this.name = name;
      }

      static getInstance() {  // メソッド経由でインスタンス生成・取得
        if(this.instance) {
          return this.instance;
        }
        this.instance = new Department('Max');
      }

  }

- インターフェース: 構造だけを定義する型。type 型と大体同じ。
  interface Greetable {
  name: string; // 初期値の設定はできない
  age: number;

      greet(phrase: string): void;

  }

  let user1: Greetable;

  user1 = {
  name: 'Max';
  age: 30;
  greet(phrase: string) {
  console.log(phrase + this.name);
  }
  }

  class Person implements Greetable, AnotherGreetable { // 実装
  // インターフェース内の構造を強制できる
  }
