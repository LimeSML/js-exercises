function resize1(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  // params が undefined の場合、maxWidth をそのまま代入
  // params がオブジェクトなら、params.maxWidth を maxWidth に代入
  // params.maxWidth が undefined なら、maxWidth をそのまま代入
  maxWidth = (params && params.maxWidth) || maxWidth;

  // maxWidth と同様
  maxHeight = (params && params.maxHeight) || maxHeight;

  console.log({ maxWidth, maxHeight });
}

function resize2(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  maxWidth = params?.maxWidth ?? maxWidth;
  maxHeight = params?.maxHeight ?? maxHeight;

  console.log({ maxWidth, maxHeight });
}

resize1(); // { maxWidth: 600, maxHeight: 480 }
resize1({ maxWidth: 800 }); // { maxWidth: 800, maxHeight: 480 }
resize1({ maxHeight: 600 }); // { maxWidth: 600, maxHeight: 600 }
resize1({ maxWidth: 800, maxHeight: 600 }); // { maxWidth: 800, maxHeight: 600 }
resize1({}); // { maxWidth: 600, maxHeight: 480 }

resize2(); // { maxWidth: 600, maxHeight: 480 }
resize2({ maxWidth: 800 }); // { maxWidth: 800, maxHeight: 480 }
resize2({ maxHeight: 600 }); // { maxWidth: 600, maxHeight: 600 }
resize2({ maxWidth: 800, maxHeight: 600 }); // { maxWidth: 800, maxHeight: 600 }
resize2({}); // { maxWidth: 600, maxHeight: 480 }
