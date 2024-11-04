"use strict";

/* 分割代入(デストラクチャリング) */

// オブジェクトの分割代入(プロパティ名を合わせる)
const myProfile1 = {
  name1: "田中",
  age1: 30,
};
// 必要なプロパティのみを取捨選択もできる
const { name1 } = myProfile1; // 1つ目
const { age1 } = myProfile1; // 2つ目
// デフォルト値
const { name3, age3, length3 = 150 } = myProfile1;
// ネストプロパティの分割方法
const Person = {
  name: "bill",
  job: {
    jobName: "engineer",
    jobNumber: 1,
  },
};
const {
  job: { jobName }, // 「jobName」変数が取り出せる
} = Person;

// 配列の分割代入(変数名は自由)
const myProfile2 = ["山田", 20];
const [name2] = myProfile2; // 1つ目
const [, age2] = myProfile2; // 2つ目
