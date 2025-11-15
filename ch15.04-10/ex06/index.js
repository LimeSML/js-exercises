const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

const todoTemplate = document.createElement("template");
todoTemplate.innerHTML = `\
  <li>
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="content"></label>
      <button class="destroy">❌</button>
    </div>
  </li>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    this.list = this.shadowRoot.querySelector("#todo-list");
    this.input = this.shadowRoot.querySelector("#new-todo");

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.input.value.trim() === "") {
        return;
      }
      const todo = this.input.value.trim();
      this.input.value = "";

      const todoItem = todoTemplate.content.cloneNode(true);
      const li = todoItem.querySelector("li");
      const toggle = todoItem.querySelector("input");
      const label = todoItem.querySelector("label");
      const destroy = todoItem.querySelector("button");
      
      toggle.addEventListener("change", () => {
        li.classList.toggle("completed", toggle.checked);
      });
      label.textContent = todo;
      destroy.addEventListener("click", () => {
        li.remove();
      });

      this.list.prepend(li);
    });
  }
}

customElements.define("todo-app", TodoApp);
