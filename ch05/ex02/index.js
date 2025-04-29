export function escapeUsingIf(str) {
    let espcapedStr = '';
    for (const char of str) {
        if (char === '\0') {
            espcapedStr += '\\0';
        } else if (char === '\b') {
            espcapedStr += '\\b';
        } else if (char === '\t') {
            espcapedStr += '\\t';
        } else if (char === '\n') {
            espcapedStr += '\\n';
        } else if (char === '\v') {
            espcapedStr += '\\v';
        } else if (char === '\f') {
            espcapedStr += '\\f';
        } else if (char === '\r') {
            espcapedStr += '\\r';
        } else if (char === '\"') {
            espcapedStr += '\\"';
        } else if (char === '\'') {
            espcapedStr += "\\'";
        } else if (char === '\\') {
            espcapedStr += '\\\\';
        } else {
            espcapedStr += char;
        }
    }

    return espcapedStr;
}

export function escapeUsingSwtich(str) {
    let espcapedStr = '';
    for (const char of str) {
        switch (char) {
            case '\0':
                espcapedStr += '\\0';
                break;
            case '\b':
                espcapedStr += '\\b';
                break;
            case '\t':
                espcapedStr += '\\t';
                break;
            case '\n':
                espcapedStr += '\\n';
                break;
            case '\v':
                espcapedStr += '\\v';
                break;
            case '\f':
                espcapedStr += '\\f';
                break;
            case '\r':
                espcapedStr += '\\r';
                break;
            case '\"':
                espcapedStr += '\\"';
                break;
            case '\'':
                espcapedStr += "\\'";
                break;
            case '\\':
                espcapedStr += '\\\\';
                break;
            default:
                espcapedStr += char;
        }
    }

    return espcapedStr;
}