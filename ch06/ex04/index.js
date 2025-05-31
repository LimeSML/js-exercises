const obj1 = {};
Object.defineProperty(obj1, 'x', {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true
});

// プロパティの変更
obj1.x = 10;
console.log(obj1.x); // 10

// hasOwnProperty
console.log(obj1.hasOwnProperty('x')); // true

// protpertyIsEnumerable
console.log(obj1.propertyIsEnumerable('x')); // true

// プロパティの削除
delete obj1.x;
console.log(obj1.x); // undefined

const obj2 = {};
Object.defineProperty(obj2, 'x', {
    value: 1,
    writable: false,
    enumerable: false,
    configurable: false
});

// プロパティの変更
// obj2.x = 10;
// TypeError: Cannot assign to read only property 'x' of object '#<Object>'

// hasOwnProperty
console.log(obj2.hasOwnProperty('x')); // true

// protpertyIsEnumerable
console.log(obj2.propertyIsEnumerable('x')); // false

// プロパティの削除
// delete obj2.x;
// TypeError: Cannot delete property 'x' of #<Object>