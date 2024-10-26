"use strict";

/* 分割代入(デストラクチャリング) */

// オブジェクトの分割代入
const myProfile1 = {
  name: "田中",
  age: 30,
};
const { name1, age1 } = myProfile1;

// 必要なプロパティのみを取捨選択もできる
const { name } = myProfile1;

// 配列の分割代入
const myProfile2 = ["山田", 20];
const [name2, age2] = myProfile2;

// 分割代入のデフォルト値
const { name3, age3, length3 = 150 } = myProfile1;
