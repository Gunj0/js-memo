"use strict";

/* falsy */
0; // 数字のみ
undefined;
null;
NaN; // Not a number
(""); // 空文字

/* truthy */
// falsy以外
("0");
("ABC");
10;
[];
{
}

// 左がtruthyなら右が実行される(論理和)
const fee1 = 1 && "設定済"; //

// 左がfalsyなら右が実行される(論理積)
const fee2 = null || "金額未設定";
