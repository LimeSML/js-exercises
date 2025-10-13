// URL を使って [タイトル](URL) というマークダウン形式にする
// 意外と面倒だし、[] と () の順番を忘れる...

javascript: (async () => {
  const title = prompt("タイトルを入力してください");
  setTimeout(() => {
    navigator.clipboard
      .writeText(`[${title}](${location.href})`)
      .then(() => {
        alert("コピーしました");
      })
      .catch((err) => {
        console.error(err);
        alert("コピーに失敗しました");
      });
  }, 500);
})();
