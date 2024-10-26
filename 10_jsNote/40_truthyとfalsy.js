"use strict";

/* truthy */

"ABC";
10;
[];
{
}

/* falsy */

0;
undefined;
null;
NaN;
("");

// truthyの時に値を返却して終了する
const num1 = null;
const fee1 = num1 || "金額未設定"; // "金額未設定"が代入される

// falsyの時に値を返却して終了する
const num2 = 1;
const fee2 = num2 && "設定済"; // "設定済"が代入される
