# JavaScript

## データ型

- number: 1, 6.2, -10
- string: 'Hi', "Hi", `Hi`(テンプレート文字列)
- boolean: true, false
- object: {name: 'hoge', age: 30}
- Array: [1, 2, 3]

## Tips

- ブラウザの対応状況(モダンは ES6=ES2015 以降)

  - ECMAScript：
  - CanIUse：https://caniuse.com/

- コールバック関数
  ある関数を呼び出す時に、引数に指定する別の関数のこと
  check(num, function(){
  click('ok');
  });

- html ファイルで先頭に defer をつけて書くと html のあとに読み込みできる
    <script src="app.js" defer></script>

- error の投げ方
  throw new Error('コンソールログに出力される');
  throw { message: 'エラー', errorCode: 500};

- 型チェック方法
  if(typeof n1 !== 'number'){ // n1 が number 型でなかった場合の処理 }

- foreach っぽいやつ
  for (const hobby of hobbies){
  // 配列 hobbies のループを回せる
  }

- addEventListener に関数を渡すとき
  以下だと関数の返り値を第二引数に設定しているのでエラーになる。
  button.addEventListener('click', clickHandler('hoge'));
  関数自体を渡す必要がある
  button.addEventListener('click', clickHandler);
  引数付きの関数を渡したい場合はコールバック関数とする。
  button.addEventListener('dblclick', () => {
  clickHandler('huga');
  });
  ただしこれだと冗長なのとアンバインドできないので、bind を使うとより良い。
  button.addEventListener('click',
  clickHandler.bind(null, 'hoge')); // 第一引数は関数内で this キーワードに紐づく

- let と var の違い
  - 再定義
    - var は再定義可。let は不可。
  - スコープ
    - var は関数スコープとグローバルスコープ
    - let はブロックスコープもある(if, for の中の定義は外で使えない)

## 基本機能

- 関数

  - レガシー
    function add(a, b){
    return a + b;
    }
  - 関数式
    const add = function(a, b) {
    return a + b;
    }
  - アロー関数
    const add = (a, b) => {a + b};

- スプレッド構文(展開)
  - 配列
    const hobbies = ['Sports', 'Hiking'];
    const active = ['Hiking', ...hobbies];  
     activeHobbies.push(...hobbies);
  - オブジェクト
    const person = {name: 'Max', age: 30};
    const copiedPerson = {...person}; // 参照ではなく値コピーができる
- レストパラメータ: 引数の数を任意にできる
  const add = (...numbers) => {
  let result = 0;
  return numbers.reduce((curResult, curValue) => {
  return curResult + curValur;
  }, 0);
  }
  const result = add(1, 3, 5, 2);

- 分割代入
  - 配列
    const hobbies = [1, 2, 3, 4];
    const [hobby1, hobby2, ...hobbies] = hobbies;
  - オブジェクト
    const { firsrName: userName, age } = person;
