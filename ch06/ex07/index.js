export function assign(target, ...sources) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  if (sources.length === 0) {
    return target;
  }
  if (typeof target !== "object") {
    // プリミティブ型をオブジェクトに変換
    target = Object(target);
  }

  for (const source of sources) {
    if (typeof source !== "object" || source === null) {
      continue;
    }

    // 列挙可能かつ独自プロパティ
    for (const key of Object.keys(source)) {
      if (!source.hasOwnProperty(key)) {
        continue;
      }
      target[key] = source[key];
    }

    // 列挙可能かつ Symbol プロパティ
    const symbols = Object.getOwnPropertySymbols(source);
    for (const sym of symbols) {
      const desc = Object.getOwnPropertyDescriptor(source, sym);
      if (desc && desc.enumerable) {
        target[sym] = source[sym];
      }
    }
  }
  return target;
}
