const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos(todos);
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos(todos);
    });

    list.appendChild(li);
    applyFilter();
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

function applyFilter() {
  const todos = list.querySelectorAll("li");
  switch (location.hash) {
    case "#/":
      todos.forEach((todo) => {
        todo.style.display = "";
      });
      break;
    case "#/active":
      todos.forEach((todo) => {
        const toggle = todo.querySelector("input");
        if (toggle.checked) {
          todo.style.display = "none";
        } else {
          todo.style.display = "";
        }
      });
      break;
    case "#/completed":
      todos.forEach((todo) => {
        const toggle = todo.querySelector("input");
        if (toggle.checked) {
          todo.style.display = "";
        } else {
          todo.style.display = "none";
        }
      });
      break;
    default:
      break;
  }
}

window.addEventListener("hashchange", applyFilter);
