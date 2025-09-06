function counterIter(max) {
    console.log("counterIter");
    let c = 1;
    return {
        [Symbol.iterator]() {
            console.log("counterIter: Symbol.iterator");
            return this;
        },
        next() {
            console.log("counterIter: next");
            if (c >= max + 1) {
                return { value: undefined, done: true };
            }
            const value = c;
            c++;
            return { value, done: false };
        },
        return(value) {
            console.log("counterIter: return:", value);
            return { value, done: true };
        },
        throw(e) {
            console.log("counterIter: throw:", e);
            throw e;
        },
    };
}

function* counterGen(max) {
    console.log("counterGen");
    try {
        for (let c = 1; c <= max; c++) {
            console.log("counterGen: next");
            yield c;
        }
    } catch (e) {
        console.log("counterGen: catch:", e);
        throw e;
    } finally {
        console.log("counterGen: finally");
    }
}

// ----- counterIter -----

// const iter1 = counterIter(3);
// console.log(iter1.next());

// const iter2 = counterIter(3);
// console.log(iter2.return('強制終了'));

// const iter3 = counterIter(3);
// try {
//     iter3.throw('エラー');
// } catch (e) {
//     console.log(e);
// }

// for (const v of counterIter(3)) {
//     console.log(v);
// }

// for (const v of counterIter(3)) {
//     console.log(v);
//     if (v === 2) {
//         break;
//     }
// }

// try {
//     for (const v of counterIter(3)) {
//         console.log(v);
//         if (v === 2) {
//             throw new Error('エラー');
//         }
//     }
// } catch (e) {
//     console.log('キャッチ:', e);
// }

// ----- counterGen -----

// const gen1 = counterGen(3);
// console.log(gen1.next());

// const gen2 = counterGen(3);
// console.log(gen2.next());
// console.log(gen2.return('強制終了'),);

// const gen3 = counterGen(3);
// console.log(gen3.next());
// try {
//     gen3.throw('エラー');
// } catch (e) {
//     console.log(e);
// }

// for (const v of counterGen(3)) {
//     console.log(v);
// }

// for (const v of counterGen(3)) {
//     console.log(v);
//     if (v === 2) {
//         break;
//     }
// }

// try {
//     for (const v of counterGen(3)) {
//         console.log(v);
//         if (v === 2) {
//             throw new Error('エラー');
//         }
//     }
// } catch (e) {
//     console.log('キャッチ:', e);
// }