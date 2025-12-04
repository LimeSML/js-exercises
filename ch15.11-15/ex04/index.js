const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// { id: UUID, name: "...", status: "active" | "completed" } の配列
const allTasks = getAllTasks();
renderTasks(allTasks);

function renderTasks(tasks) {
  if (!Array.isArray(tasks)) {
    throw new Error("tasks must be an array");
  }
  
  for (const task of tasks) {
    if (
      typeof task.id !== "string" ||
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
    toggle.addEventListener("change", (e) => {
      updateTask({ ...task, status: e.target.checked ? "completed" : "active" });
      saveTasks(allTasks);
      renderTasks(allTasks);
    });

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      deleteTask(task.id);
      saveTasks(allTasks);
      renderTasks(allTasks);
    });

    div.append(toggle, label, destroy);
    elem.append(div);
    list.prepend(elem);
  });
}

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // デフォルト動作としてブラウザがページをリロードしてフォームの内容を送信しようとするから
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }

  const id = crypto.randomUUID();
  const name = input.value.trim();
  const status = "active";
  allTasks.push({ id, name, status });
  
  input.value = "";

  saveTasks(allTasks);
  renderTasks(allTasks);
});

window.addEventListener("storage", (e) => {
  if (e.key !== "tasks") {
    return;
  }
  const newTasks = getAllTasks();
  allTasks.length = 0;
  allTasks.push(...newTasks);
  renderTasks(allTasks);
})

function updateTask(task) {
  if (
    typeof task.id !== "string" ||
    typeof task.name !== "string" ||
    (task.status !== "active" && task.status !== "completed")
  ) {
    throw new Error("invalid task object");
  }

  const taskToUpdate = allTasks.find((t) => t.id === task.id);
  if (taskToUpdate == null) {
    throw new Error(`Task with id ${task.id} not found`);
  }
  taskToUpdate.status = task.status;
} 

function deleteTask(id) {
  const taskIndex = allTasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  allTasks.splice(taskIndex, 1);
}

function getAllTasks() {
  try {
    const allTasksJSON = localStorage.getItem("tasks");
    if (allTasksJSON == null) {
      return [];
    }

    const parsed = JSON.parse(allTasksJSON);
    if (typeof parsed !== "object" || parsed === null) {
      return [];
    }
    if (!Array.isArray(parsed.items)) {
      return [];
    }

    const items = parsed.items;
    const allTasks = items.filter((item) => {
      return (
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        (item.status === "active" || item.status === "completed")
      );
    });
    return allTasks;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function saveTasks(tasks) {
  if (!Array.isArray(tasks)) {
    throw new Error("tasks must be an array");
  }
  
  for (const task of tasks) {
    if (
      typeof task.id !== "string" ||
      typeof task.name !== "string" ||
      (task.status !== "active" && task.status !== "completed")
    ) {
      throw new Error("invalid task object");
    }
  }

  try {
    localStorage.setItem("tasks", JSON.stringify({ items: tasks }));
  } catch (err) {
    console.error(err);
  }
}