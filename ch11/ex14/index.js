export function sortJapanese(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('input must be an array');
    }
    if (arr.some(item => typeof item !== 'string')) {
        throw new Error('all elements in the array must be strings');
    }
    if (arr.length === 0) {
        return [];
    }

    const collator = new Intl.Collator('ja', {
        sensitivity: 'base',
        usage: 'sort',
    });
    return [...arr].sort(collator.compare);
}

export function toJapaneseDateString(date) {
    if (!(date instanceof Date)) {
        throw new Error('input must be a Date object');
    }

    return new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
        calendar: 'japanese',
        dateStyle: 'long',
    }).format(date);
}

console.log(sortJapanese(['ばなな', 'はな', 'バラ', 'つき', 'っぽ']));
// [ 'つき', 'っぽ', 'はな', 'ばなな', 'バラ' ]

console.log(toJapaneseDateString(new Date(2025, 7, 1)).toString());
// 令和7年8月1日
