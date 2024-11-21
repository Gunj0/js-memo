"use strict";

/* 関数 */

// 通常の関数
// 関数の巻き上げ(hoisting)により、呼び出しが先でもOK
function funcJS1(str = "デフォルト値") {
  return str;
}
funcJS1(); // 呼び出し

// 関数式
// 巻き上げは起きないので、呼び出しは後ろ限定
const funcJS2 = function (str) {
  return str;
};
funcJS2(); // 呼び出し

// アロー関数
// 巻き上げは起きないので、呼び出しは後ろ限定
const funcJS3 = (str) => `${str}様`;
funcJS3(); // 呼び出し

// コールバック関数
// ある関数を呼び出す時に、引数に指定する別の関数のこと
check(num, function () {
  click("ok");
});
