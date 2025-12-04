const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      mode: "cors",
      credentials: "include", 
    });

    if (!response.ok) {
      throw new Error("タスクの取得に失敗しました。");
    }

    const data = await response.json();
    for (const task of data.items) {
      appendToDoItem(task);
    }
  } catch (err) {
    alert(err.message);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // A: ページのリロードを防ぐため
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ name: todo }),
      mode: "cors",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("タスクの作成に失敗しました。");
    }

    const data = await response.json();
    appendToDoItem(data);
  } catch (err) {
    alert(err.message);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  if (toggle.checked) {
    label.style.textDecorationLine = "line-through";
  }
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          status: toggle.checked ? "completed" : "active",
        }),
        mode: "cors",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("ステータスの更新に失敗しました。");
      }

      const data = await response.json();
      if (data.status === "completed") {
        label.style.textDecorationLine = "line-through";
      } else {
        label.style.textDecorationLine = "none";
      }
    } catch (err) {
      alert(err.message);
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("タスクの削除に失敗しました。");
      }

      elem.remove();
    } catch (err) {
      alert(err.message);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}
