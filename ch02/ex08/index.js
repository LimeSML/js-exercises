import { parse } from "acorn";

const codeWithoutSemicolon = `let a
a
=
3
console.log(a)`;

const codeWithSemicolon = `let a; a = 3; console.log(a);`;

const astWithoutSemicolon = parse(codeWithoutSemicolon, { ecmaVersion: 2020 });
const astWithSemicolon = parse(codeWithSemicolon, { ecmaVersion: 2020 });

console.log(JSON.stringify(astWithoutSemicolon, null, 2));
console.log(JSON.stringify(astWithSemicolon, null, 2));
