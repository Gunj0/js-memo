"use strict";

/* map と filter */

// map: 要素を1つずつ操作する
const nameArr1 = ["田中", "山田", "佐藤"];
nameArr.map((nam) => {
  console.log(nam);
});

// map: 別の配列を作る
const nameArr2 = nameArr1.map((nam) => {
  return nam;
});

// map: インデックスを使う
nameArr1.map((nam, index) => console.log(`${index}: ${nam}`));

// filter: 特定の要素だけ取り出す
const nameArr3 = nameArr1.filter((nam) => {
  return nam === "田中";
});
