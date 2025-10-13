// typeof undefined -> undefined
// typeof null -> object
// typeof オブジェクト -> object
// typeof NaN -> number
// typeof 数値 -> number
// typeof 関数 -> function

console.log(`typeof undefined -> ${typeof undefined}`);
console.log(`typeof null -> ${typeof null}`);
console.log(`typeof { a: 1 } -> ${typeof { a: 1 }}`);
console.log(`typeof NaN -> ${typeof NaN}`);
console.log(`typeof 1 -> ${typeof 1}`);
function f() {}
console.log(`typeof f -> ${typeof f}`);

// typeof undefined -> undefined
// typeof null -> object
// typeof { a: 1 } -> object
// typeof NaN -> number
// typeof 1 -> number
// typeof f -> function
