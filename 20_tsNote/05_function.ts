/* 関数 */
// 旧来
function funcTS1(v1: number, v2: number): number {
  return v1 + v2;
}
const func1Result = funcTS1(1, 2);

// 関数式
const funcTS2 = function (v1: number, v2: number): number {
  return v1 + v2;
};
const func2Result = funcTS2(3, 4);

// アロー関数
const funcTS3 = (v1: number, v2: number) => v1 + v2;
const func3Result = funcTS3(5, 6);

// コールバック関数
function calc(
  v1: number,
  v2: number,
  func4: (a: number, b: number) => number
): number {
  return func4(v1, v2);
}

/* 出力サンプル */
console.log({ func1Result, func2Result, func3Result });
console.log(calc(1, 2, funcTS1));
