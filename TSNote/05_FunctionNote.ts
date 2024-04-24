/* 記法 */
// 通常関数
function func1(v1: number, v2: number): number {
  return v1 + v2;
}
const func1Result = func1(1, 2);

// 関数式
const func2 = function func2Tmp(v1: number, v2: number): number {
  return v1 + v2;
};
const func2Result = func2(3, 4);

// アロー関数
const func3 = (v1: number, v2: number) => v1 + v2;
const func3Result = func3(5, 6);

// コールバック関数
function calc(
  v1: number,
  v2: number,
  callback: (a: number, b: number) => number
): number {
  return callback(v1, v2);
}

/* 出力サンプル */
console.log({ func1Result, func2Result, func3Result });
console.log(calc(1, 2, func1));
