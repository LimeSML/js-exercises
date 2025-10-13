export function stringifyJSON(value) {
  // 制御文字や特殊文字を検出する正規表現
  // eslint-disable-next-line no-control-regex
  const escapable = /[\\"\u0000-\u001F\u2028\u2029]/g;

  // 特殊文字 → エスケープ文字の対応表
  const meta = {
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    '"': '\\"',
    "\\": "\\\\",
  };

  /**
   * 文字列を JSON 形式の文字列に変換
   * 制御文字や特殊文字はエスケープする
   */
  function quote(str) {
    return (
      '"' +
      str.replace(escapable, (ch) => {
        // meta に変換ルールがあればそれを使う
        const esc = meta[ch];
        if (esc) {
          return esc;
        }

        // それ以外は Unicode エスケープ (\uXXXX)
        return "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0");
      }) +
      '"'
    );
  }

  /**
   * 値を JSON 文字列に変換する再帰関数
   */
  function str(key, holder) {
    let v = holder[key];

    // toJSONがあればそれを使う
    if (v && typeof v === "object" && typeof v.toJSON === "function") {
      v = v.toJSON(key);
    }

    switch (typeof v) {
      case "string":
        return quote(v);
      case "number":
        return Number.isFinite(v) ? String(v) : "null";
      case "boolean":
        return String(v);
      case "object": {
        if (v === null) {
          return "null";
        }

        // 配列の場合
        if (Array.isArray(v)) {
          return (
            "[" +
            v
              .map((_, i) => {
                const res = str(i, v);
                return res === undefined ? "null" : res;
              })
              .join(",") +
            "]"
          );
        }

        // オブジェクトの場合
        const props = Object.keys(v)
          .map((k) => {
            const res = str(k, v);
            return res === undefined ? undefined : quote(k) + ":" + res;
          })
          .filter((p) => p !== undefined);

        return "{" + props.join(",") + "}";
      }
    }
    return undefined;
  }

  return str("", { "": value });
}
