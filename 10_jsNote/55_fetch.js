"use strict";

// fetch は HTTP リクエストを送信する
// Promise(Pending/Resolved/Rejectedの状態をとるオブジェクト) を返す
const promise = fetch("https://api.randomuser.me/?nat=US&results=l)");
console.log(promise);

// fetch が成功すると then 内のコールバック関数が実行させる
fetch("https://api.randomuser.me/?nat=US&results=l)").then((res) =>
  console.log(res.json())
);

// then の戻り値は、次の then の引数になる
fetch("https://api.randomuser.me/?nat=US&results=l)")
  .then((res) => res.json())
  .then((json) => console.log(json));

// 例外が発生した場合は catch 内のコールバック関数が実行される
fetch("https://api.randomuser.me/?nat=US&results=l)")
  .then((res) => console.log(res))
  .catch((res) => console.error(res));
