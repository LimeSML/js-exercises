const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const abortController = new AbortController();
    const response = await retryWithExponentialBackoff(
      () => getAllTasks(abortController),
      abortController,
      3000
    );

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
    const abortController = new AbortController();
    const response = await retryWithExponentialBackoff(
      () => createTask(todo, abortController),
      abortController,
      3000
    );

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
      const abortController = new AbortController();
      const response = await retryWithExponentialBackoff(
        () =>
          updateTaskStatus(
            task.id,
            toggle.checked ? "completed" : "active",
            abortController
          ),
        abortController,
        3000
      );

      const data = await response.json();
      if (data.status === "completed") {
        label.style.textDecorationLine = "line-through";
      } else {
        label.style.textDecorationLine = "none";
      }
    } catch (err) {
      alert(err.message);
      toggle.checked = !toggle.checked;
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", async () => {
    try {
      const abortController = new AbortController();
      await retryWithExponentialBackoff(
        () => deleteTask(task.id, abortController),
        abortController,
        3000
      );

      elem.remove();
    } catch (err) {
      alert(err.message);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

function getAllTasks(abortController) {
  if (!(abortController instanceof AbortController)) {
    throw new Error("Invalid AbortController");
  }
  
  const signal = abortController.signal;
  return fetch("/api/tasks", {
    signal: signal,
  });
}

function createTask(todo, abortController) {
  if (typeof todo !== "string" || todo.trim() === "") {
    throw new Error("Invalid task name");
  }
  if (!(abortController instanceof AbortController)) {
    throw new Error("Invalid AbortController");
  }
  
  const signal = abortController.signal;
  return fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ name: todo }),
    signal: signal,
  });
}

function updateTaskStatus(id, status, abortController) {
  if (typeof id !== "number" || id <= 0) {
    throw new Error("Invalid task ID");
  }
  if (status !== "active" && status !== "completed") {
    throw new Error("Invalid status");
  }
  if (!(abortController instanceof AbortController)) {
    throw new Error("Invalid AbortController");
  }
  
  const signal = abortController.signal;
  return fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ status: status }),
    signal: signal,
  });
}

function deleteTask(id, abortController) {
  if (typeof id !== "number" || id <= 0) {
    throw new Error("Invalid task ID");
  }
  if (!(abortController instanceof AbortController)) {
    throw new Error("Invalid AbortController");
  }

  const signal = abortController.signal;
  return fetch(`/api/tasks/${id}`, {
    method: "DELETE",
    signal: signal,
  });
}

export function retryWithExponentialBackoff(func, abortController, maxMs) {
  if (typeof func !== "function") {
    throw new Error("Invalid function");
  }
  if (!(abortController instanceof AbortController)) {
    throw new Error("Invalid AbortController");
  }
  if (typeof maxMs !== "number" || maxMs <= 0) {
    throw new Error("Invalid maxMs");
  }

  return new Promise((resolve, reject) => {
    let attempt = 0;
    let timeoutId = null;

    const tryFunc = async () => {
      // キャンセルされていたら reject
      if (abortController.signal.aborted) {
        reject(new Error("Aborted"));
        return;
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        abortController.abort();
        reject(new Error("処理を中止しました。"));
      }, maxMs);

      try {
        const response = await func();
        if (response.ok) {
          resolve(response);
          return;
        }

        if (response.status >= 500 && response.status < 600) {
          const delay = Math.pow(2, attempt) * 1000;
          attempt++;
          setTimeout(tryFunc, delay);
          return;
        }

        reject(new Error(`HTTP Error: ${response.status}`));
      } catch (err) {
        reject(err);
      }
    };

    setTimeout(tryFunc, 0);
  });
}