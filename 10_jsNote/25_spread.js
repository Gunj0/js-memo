/* スプレッド構文 */
// ...で展開される
const arr1 = [1, 2];
const arr2 = [...arr1, 2];

// 引数に展開して渡す
const sum = (num1, num2) => console.log(num1 + num2);
sum(...arr1);

// 分割して取り出して残りをまとめる
const arr3 = [1, 2, 3, 4, 5];
const [num1, num2, ...arr4] = arr3;
