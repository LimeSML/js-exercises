export function reverse(str: string): string {
  const segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "grapheme" });
  const segments = segmenterJa.segment(str);

  const reversedSegments = Array.from(segments).reverse();
  const reversedStr = reversedSegments
    .map((segment) => segment.segment)
    .join("");
  return reversedStr;
}
