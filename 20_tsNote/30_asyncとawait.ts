/* asyncとawait */
import fs from "fs"; // Node.jsのファイル読み込みライブラリ
import util from "util"; // Node.jsの便利機能パッケージライブラリ

const promisifyReadFile = util.promisify(fs.readFile);

// promise
function fileReadPromise1() {
  // ファイルを返すPromise(約束)を代入する
  const readFilePromise = promisifyReadFile("package.json");
  // Promiseが終わったらここを実行する
  readFilePromise.then((data) => {
    const fileContent = data.toString();
    console.log(fileContent);
  });
}
fileReadPromise1();

// async
async function fileReadPromise2() {
  // ファイルを返すPromise(約束)が終わるのを待って結果を代入する
  const data = await promisifyReadFile("package.json");
  const fileContent = data.toString();
  console.log(fileContent);
}
fileReadPromise2();

/* 処理順が入れ替わる例 */
function fileRead() {
  let fileContent: string = "Loading...";

  fs.readFile("package.json", (err, data) => {
    // 非同期でファイル読み込みが終わったらここを実行する
    fileContent = data.toString();
    console.log(fileContent);
  });
  // 非同期処理が終わる前にこれが実行される
  console.log(fileContent);
}
fileRead();
