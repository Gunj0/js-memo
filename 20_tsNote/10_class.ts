/* クラス */
class ClassNote1 {
  // フィールド
  v1: number; // デフォルトはpublic
  private _v2: number; // 外からアクセス不可にする場合

  // コンストラクタ
  constructor(v1: number, v2: number) {
    this.v1 = v1;
    this._v2 = v2;
  }

  // getter
  get v2Read() {
    return this._v2;
  }

  // メソッド
  add(): number {
    return this.v1 + this._v2;
  }
}

// privateコンストラクタの省略記法
class ClassNote2 {
  constructor(private _v3: number) {}

  get v3Read() {
    return this._v3;
  }
}

/* 出力サンプル */
const classOutput1 = new ClassNote1(1, 2);
const classOutput2 = new ClassNote2(4);
console.log(
  classOutput1.v1,
  classOutput1.v2Read,
  classOutput1.add(),
  classOutput2.v3Read
);
