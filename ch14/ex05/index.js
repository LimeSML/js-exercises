export function template(strings, ...values) {
  const types = values.map((v) => typeof v);

  let result = strings[0];
  types.forEach((type, i) => {
    result += type + strings[i + 1];
  });
  return result;
}

// const str = template`type of 'A' is ${"A"}`;
// console.log(str);
