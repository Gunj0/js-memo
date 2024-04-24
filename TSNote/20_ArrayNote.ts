/* 記法 */
const nums = [0, 10, 20];

// forEach: 各要素に変更を加える
nums.forEach((num) => console.log(num * 2));

// forEach: インデックスを使用する場合
nums.forEach((num, i) => {
  const double = num * 2;
  console.log(`${i}: ${double}`);
});

// map: 各要素を変更した別の配列を作る
const numsDouble = nums.map((num, i) => {
  return {
    id: i,
    num: num,
  };
});
console.log(numsDouble);

// filter: 一部の要素を抜き出した配列を作る
const numsFilter = numsDouble.filter((num) => num.id % 2 === 0);
console.log(numsFilter);

// reduce: 要素を順に取り出して前の結果と操作を行う
const sum = nums.reduce((pre, cur) => pre + cur, 0);
console.log(sum);
