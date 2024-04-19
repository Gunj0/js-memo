function add1(v1:number, v2:number): number {
  return v1 + v2;
}

const result1 = add1(1, 2)
console.log(`result1 = ${result1}`)

const add2 = function (v1:number, v2:number): number {
  return v1 + v2;
}

console.log(add2);

const result2 = add2(1, 2);
console.log(`result2 = ${result2}`);

const add3 = (v1:number, v2:number): number => v1 + v2;

function add(v1: number, v2: number) {
  return v1 + v2;
}

function calc(v1: number, v2: number,
  callback: (a: number, b: number) => number
): number {
  return callback(v1, v2);
}

const hoge = calc(1, 5, add)
console.log(hoge);


setTimeout(() => {
  console.log('hello')
}, 5000);

