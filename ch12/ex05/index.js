import { openSync, closeSync, readSync } from 'node:fs';

export function* readLines(filePath) {
    if (typeof filePath !== 'string') {
        throw new TypeError('filePath must be a string');
    }

    const BUFFER_SIZE = 1024;
    const fd = openSync(filePath, 'r');
    const buffer = Buffer.alloc(BUFFER_SIZE);
    let leftover = '';

    try {
        let bytesRead;
        while ((bytesRead = readSync(fd, buffer, 0, BUFFER_SIZE, null)) > 0) {
            // 読み込んだ部分を文字列化
            const chunk = leftover + buffer.toString('utf8', 0, bytesRead);
            leftover += chunk;

            // 改行で分割
            const lines = leftover.split('\n');

            // 最後の要素はまだ改行で終わっていない可能性があるので leftover に残す
            leftover = lines.pop();

            for (const line of lines) {
                yield line; // 改行は除去されている
            }
        }

        // 最後に残った行があれば yield
        if (leftover.length > 0) {
            yield leftover;
        }

    } finally {
        closeSync(fd);
    }
}

const readLinesGen = readLines('./ch12/ex05/sample.txt');
console.log(readLinesGen.next());
console.log(readLinesGen.next());
console.log(readLinesGen.next());
