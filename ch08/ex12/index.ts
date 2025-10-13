/* eslint-disable @typescript-eslint/ban-types */
export function f(body: string): Function {
  let functionBody: string;
  if (body.trim().startsWith("{") && body.trim().endsWith("}")) {
    // 波括弧で囲まれている場合はそのまま使う
    functionBody = body.trim().slice(1, -1).trim();
  } else {
    // それ以外はreturnを付与
    functionBody = `return ${body};`;
  }
  return new Function(
    "$1",
    "$2",
    "$3",
    "$4",
    "$5",
    "$6",
    "$7",
    "$8",
    "$9",
    "$10",
    functionBody,
  );
}
