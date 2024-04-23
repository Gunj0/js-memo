/* 記法 */
// 変数記法
function func1(v1: number, v2: number): number {
  return v1 + v2;
}
const func1Result = func1(1, 2);

// 変数記法
const func2 = function func2Tmp(v1: number, v2: number): number {
  return v1 + v2;
};
const func2Result = func2(3, 4);

// ラムダ記法
const func3 = (v1: number, v2: number) => v1 + v2;
const func3Result = func3(5, 6);

/* 出力サンプル */
console.log({ func1Result, func2Result, func3Result });
