const prototype = {
    1: 'protptype-1',
    'a': 'prototype-a',
};
Object.defineProperty(prototype, 'enumerable', {
    value: 'true',
    enumerable: true,
});

const obj = Object.create(prototype);
obj[1] = 'own-1';
obj[2] = 'own-2';
obj['a'] = 'own-a';
obj['b'] = 'own-b';
Object.defineProperty(obj, 'enumerable', {
    value: 'false',
    enumerable: false,
});

for (const key in obj) {
    console.log(key);
}

// 1
// 2
// a
// b