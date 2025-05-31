const proto = {
    1: 'protp-1',
    'a': 'proto-a',
};
Object.defineProperty(proto, 'enumerable', {
    value: 'true',
    enumerable: true,
});

const obj = Object.create(proto);
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