"use strict";

/* スプレッド構文 */

// ...で展開される
const arr1 = [1, 2];
const arr2 = [...arr1, 3];

// 引数に展開して渡す
const sum = (num1, num2) => console.log(num1 + num2);
sum(...arr1);

// 分割して取り出して残りをまとめる
const arr3 = [1, 2, 3, 4, 5];
const [num1, num2, ...arr4] = arr3;

/*

- スプレッド構文(展開)
  - 配列
    const hobbies = ['Sports', 'Hiking'];
    const active = ['Hiking', ...hobbies];  
     activeHobbies.push(...hobbies);
  - オブジェクト
    const person = {name: 'Max', age: 30};
    const copiedPerson = {...person}; // 参照ではなく値コピーができる
- レストパラメータ: 引数の数を任意にできる
  const add = (...numbers) => {
  let result = 0;
  return numbers.reduce((curResult, curValue) => {
  return curResult + curValur;
  }, 0);
  }
  const result = add(1, 3, 5, 2);

  */
