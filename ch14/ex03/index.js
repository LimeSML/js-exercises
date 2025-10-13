export class IgnoreAccentPattern {
  constructor(pattern) {
    if (pattern instanceof RegExp) {
      const flags = pattern.flags;
      const source = pattern.source
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      this.regexp = new RegExp(source, flags);
      return;
    }

    if (typeof pattern === "string") {
      const source = pattern.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      this.regexp = new RegExp(source);
      return;
    }

    throw new TypeError("pattern must be string or RegExp");
  }

  [Symbol.match](str) {
    const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizedStr.match(this.regexp);
  }

  [Symbol.search](str) {
    const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizedStr.search(this.regexp);
  }
}
