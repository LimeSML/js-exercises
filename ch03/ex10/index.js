const s1 = Symbol("hoge");
const s2 = Symbol("hoge");
const o1 = {
  [s1]: "hoge",
  [s2]: "fuga",
};

console.log(o1[s1]);
console.log(o1[s2]);

const sf1 = Symbol.for("hoge");
const sf2 = Symbol.for("hoge");

const o2 = {
  [sf1]: "hoge",
  [sf2]: "fuga",
};

console.log(o2[sf1]);
console.log(o2[sf2]);
