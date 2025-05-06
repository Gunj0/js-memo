"use strict";

/* map と filter */

// map: 要素を1つずつ操作する
const numArr1 = [1, 3, 2];
numArr1.map((num) => {
  console.log(num);
});

// map: 別の配列を作る
const numArr2 = numArr1.map((nam) => num * 2);

// map: インデックスを使う
numArr1.map((num, index) => console.log(`${index}: ${nam}`));

// filter: 特定の要素だけ取り出す
const numArr3 = numArr1.filter((num) => num > 2);
