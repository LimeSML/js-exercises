const tokenInput = document.querySelector('#token');
const fileInput = document.querySelector('#file');
const uploadButton = document.querySelector('#upload-button');

uploadButton.addEventListener('click', async () => {
  const token = tokenInput.value.trim();
  if (token === '') {
    alert("アクセストークンを入力してください");
    return;
  }

  const file = fileInput.files[0];
  if (file == null) {
    alert("アップロードするファイルを選択してください");
    return;
  }

  try {
    uploadButton.disabled = true;
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/root:/${encodeURIComponent(file.name)}:/content`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": file.type || "application/octet-stream"
      },
      body: file
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    alert("ファイルが正常にアップロードされました: " + result.webUrl);
  } catch (err) {
    alert("アップロード中にエラーが発生しました: " + err.message);
  } finally {
    uploadButton.disabled = false;
  }
});