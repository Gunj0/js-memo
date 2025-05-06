"use strict";

/* Promiseじゃない例 */
let a = 0;
setTimeout(() => {
  a = 1; // 非同期で実行される
}, 2000);
console.log(a); // この時点ではa=0のまま

/* Promise */
new Promise((resolve, reject) => {
  setTimeout(() => {
    a = 1; // 非同期で実行される
    resolve(a); // thenにaを渡す
  }, 2000);
})
  .then((b) => {
    // aの値が渡ってくる
    // resolve()が呼ばれるとthen内が実行される
    console.log(b); // a=1
  })
  .catch(() => {
    // reject()が呼ばれるとcatch内が実行される
  });
