describe("💯 handling", () => {
  it("💯 length should be 2 in UTF-16", () => {
    expect("💯".length).toBe(2);
  });

  it("UTF-16 code point equals 💯", () => {
    expect("💯").toBe("\uD83D\uDCAF");
  });

  it("UTF-32 code point equals 💯", () => {
    expect("💯").toBe("\u{1F4AF}");
  });
});
