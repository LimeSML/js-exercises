import { parse, tokenizer } from "acorn";

function stripPositions(node) {
    if (Array.isArray(node)) {
        return node.map(stripPositions);
    } else if (node && typeof node === "object") {
        const newNode = {};
        for (const key in node) {
            if (key === "start" || key === "end") {
                continue;
            }
            newNode[key] = stripPositions(node[key]);
        }
        return newNode;
    }
    return node;
}

function getSemicolonIndices(jsCode) {
    const semicolonIndices = [];
    for (const token of tokenizer(jsCode, { ecmaVersion: 2020 })) {
        if (token.type.label === ';') {
            semicolonIndices.push(token.start);
        }
    }
    return semicolonIndices;
}

export function removeSemicolon(jsCode) {
    try {
        const originalAst = parse(jsCode, { ecmaVersion: 2020 });
        const semicolonIndices = getSemicolonIndices(jsCode);

        let outputCode = jsCode;
        // セミコロンを削除した場合に文字の位置の影響がないよう、逆順に処理する
        for (let i = semicolonIndices.length - 1; i >= 0; i--) {
            const start = semicolonIndices[i];
            const end = start + 1
            const testCode = outputCode.slice(0, start) + outputCode.slice(end);
            try {
                const testAst = parse(testCode, { ecmaVersion: 2020 });
                if (JSON.stringify(stripPositions(testAst)) === JSON.stringify(stripPositions(originalAst))) {
                    outputCode = testCode;
                }
            } catch (e) {
                // 特に何もしない
            }
        }
        return outputCode;
    } catch (e) {
        return jsCode;
    }
}