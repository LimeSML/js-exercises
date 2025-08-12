export function modifyUrl({ base, path, addQuery }) {
    let url;
    try {
        url = new URL(base);
    } catch {
        throw new Error("invalid base URL");
    }
    if (path !== undefined) {
        // 先頭が "./" や "/" で始まる場合
        const cleanPath = path.replace(/^\.?\//, "");
        url.pathname = "/" + cleanPath;
    }

    if (Array.isArray(addQuery)) {
        for (const [key, value] of addQuery) {
            url.searchParams.append(key, value);
        }
    }

    return url.href;
}
