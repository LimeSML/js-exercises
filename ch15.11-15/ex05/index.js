const bc = new BroadcastChannel("tasks-sync");
bc.onmessage = async () => {
  const tasks = await getAllTasks();
  allTasks.length = 0;
  allTasks.push(...tasks);
  renderTasks(allTasks);
};

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// { id: number, name: "...", status: "active" | "completed" } の配列
const allTasks = [];
try {
  const tasks = await getAllTasks();
  allTasks.push(...tasks);
} catch (e) {
  console.error("Failed to load tasks from IndexedDB:", e);
}
renderTasks(allTasks);

function renderTasks(tasks) {
  if (!Array.isArray(tasks)) {
    throw new Error("tasks must be an array");
  }
  
  for (const task of tasks) {
    if (
      typeof task.id !== "number" ||
      typeof task.name !== "string" ||
      (task.status !== "active" && task.status !== "completed")
    ) {
      throw new Error("invalid task object");
    }
  }

  list.innerHTML = "";
  tasks.forEach((task) => {
    const elem = document.createElement("li");
    const div = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = task.name;
    label.style.textDecorationLine = "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = task.status === "completed";
    if (toggle.checked) {
      label.style.textDecorationLine = "line-through";
    }
    toggle.addEventListener("change", async (e) => {
      try {
        const updated = await updateTask({ ...task, status: e.target.checked ? "completed" : "active" });
        // 更新したタスクで配列を置き換える
        allTasks.splice(allTasks.findIndex(t => t.id === task.id), 1, updated);
        // 更新をブロードキャストする
        bc.postMessage("updated");
        renderTasks(allTasks);
      } catch (err) {
        console.error("Failed to update task:", err);
      }
    });

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", async () => {
      try {
        await deleteTask(task.id);
        // 配列から削除する
        const index = allTasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          allTasks.splice(index, 1);
        }
        // 削除をブロードキャストする
        bc.postMessage("updated");
        renderTasks(allTasks);
      } catch (err) {
        console.error("Failed to delete task:", err);
      }
    });

    div.append(toggle, label, destroy);
    elem.append(div);
    list.prepend(elem);
  });
}

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // デフォルト動作としてブラウザがページをリロードしてフォームの内容を送信しようとするから
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }

  const name = input.value.trim();
  const status = "active";
  const task = { name, status };
  
  input.value = "";

  try {
    const created = await createTask(task);
    allTasks.push(created);
    // 更新をブロードキャストする
    bc.postMessage("updated");
    renderTasks(allTasks);
  } catch (err) {
    console.error("Failed to create task:", err);
  }
});

async function openTasksDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("tasks", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };

    request.onerror = () => reject(request.error);
  });
}

async function getAllTasks() {
  const db = await openTasksDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tasks"], "readonly");
    const taskStore = transaction.objectStore("tasks");
    const request = taskStore.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function createTask(task) {
  if (
    typeof task.name !== "string" ||
    (task.status !== "active" && task.status !== "completed")
  ) {
    throw new Error("invalid task object");
  }

  const db = await openTasksDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tasks"], "readwrite");
    const taskStore = transaction.objectStore("tasks");
    const request = taskStore.put(task);
    request.onsuccess = () => resolve({ ...task, id: request.result });
    request.onerror = () => reject(request.error);
  });
}

async function updateTask(task) {
  if (
    typeof task.id !== "number" ||
    typeof task.name !== "string" ||
    (task.status !== "active" && task.status !== "completed")
  ) {
    throw new Error("invalid task object");
  }

  const db = await openTasksDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tasks"], "readwrite");
    const taskStore = transaction.objectStore("tasks");
    const request = taskStore.put(task);
    request.onsuccess = () => resolve({ ...task, id: request.result });
    request.onerror = () => reject(request.error);
  });
}

async function deleteTask(id) {
  if (typeof id !== "number" || id <= 0) {
    throw new Error("Invalid task id");
  }
  
  const db = await openTasksDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tasks"], "readwrite");
    const taskStore = transaction.objectStore("tasks");
    const request = taskStore.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

