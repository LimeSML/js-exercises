/* eslint-disable no-undef */

document.addEventListener("DOMContentLoaded", () => {
  $("div#1000").html(_.capitalize("hello"));
});

// defer だと、 HTML に書かれた順番通りにスクリプトが実行されて安全
// 今回は、index1.js が jQuery と loadash に依存するため、async をつけて非同期で実行されると意図しない動作となる場合がある
// 確実な DOM 操作を行うために、DOM 構築が完了するのを待って操作を行う