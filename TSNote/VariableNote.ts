/* 型注釈 */
// 基本
const num: number = 1.234; // 数値
const str: string = "文字列"; // 文字列
const arr: number[] = [1, 2]; // 配列
const obj: object = { 1: "文字列" }; // オブジェクト

// 特殊
const numStr: number | string = 5; // 複数

/* 出力サンプル */
console.log({ num, str, arr, obj });
