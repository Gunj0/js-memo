

- コールバック関数
  - ある関数を呼び出す時に、引数に指定する別の関数のこと

```javascript
check(num, function () {
  click("ok");
});
```

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