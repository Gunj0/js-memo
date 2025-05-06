"use strict";

/* let と const */

// letは再代入可能
// ブロックスコープをもつ(if, for)
let letSample = 1;

// constは再代入不可
// プロパティの再代入は可能
const constSample = 2;

const constSampleProp = {
  name: "田中",
  age: 30,
};
constSampleProp.name = "山田";

// varは再宣言可能（古くて非推奨）
// 関数スコープとグローバルスコープしかもたない
var varSample = 3;
