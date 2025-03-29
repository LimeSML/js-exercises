class DefaultMap extends Map {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }

    get(key) {
        if (this.has(key)) {
            return super.get(key);
        } else {
            return this.defaultValue;
        }
    }
}

class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0);
        this.totalLetters = 0;
    }

    add(text) {
        // テキストから空白文字を取り除き、すべての文字を大文字に変換する
        text = text.replace(/\s/g, "").toUpperCase();
        
        for(let character of text) {
            let count = this.letterCounts.get(character);
            this.letterCounts.set(character, count + 1);
            this.totalLetters++;
        }
    }

    toString() {
        // マップを[キー、文字数]配列に変換する
        let entries = [...this.letterCounts];

        // 文字数順にソートする。文字数が同じ場合は、アルファベット順でソートする
        entries.sort((a, b) => {
            if (a[1] === b[1]) {
                return a[0] < b[0] ? -1 : 1;
            } else {
                return b[1] - a[1];
            }
        });

        // 文字数をパーセントに変換する
        for(let entry of entries) {
            entry[1] = entry[1] / this.totalLetters * 100;
        }

        // 1% 未満の文字は表示しない
        entries = entries.filter(entry => entry[1] >= 1);

        // 各項目を一行のテキストに変換する
        let lines = entries.map(
            ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
        );

        return lines.join("\n");
    }
}

async function histogramFromStdin() {
    process.stdin.setEncoding("utf-8");
    let histogram = new Histogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}

histogramFromStdin().then(histogram => console.log(histogram.toString()));