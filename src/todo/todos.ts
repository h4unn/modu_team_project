import { STORAGE_KEY } from "./constants";
import $ from "./element";
import { handleComplete, handleRemove, handleSubmit } from "./feature";
import { Todo } from "./models/Todo.model";

export let state: {
  [STORAGE_KEY.TODOS]: Todo[];
  [STORAGE_KEY.MAP_TODO]: Map<string, Todo>;
} = {
  [STORAGE_KEY.TODOS]: [],
  [STORAGE_KEY.MAP_TODO]: new Map(),
};

if (localStorage.getItem(STORAGE_KEY.STATE)) {
  state = JSON.parse(localStorage.getItem(STORAGE_KEY.STATE) ?? "{}");

  const lastId = state.todos?.slice(-1)[0]?.id.split("-")[1] || "0";

  Todo.index = Number(lastId);
}

export function renderTodoList(todos: Todo[]) {
  const $fragment = document.createDocumentFragment();

  const length = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  const $filterCompleteCount = $.filterCompletedButton?.querySelector(".count");

  const $filterCreatedCount = $.filterCreatedButton?.querySelector(".count");

  if (!$filterCompleteCount || !$filterCreatedCount) return;

  $filterCompleteCount.textContent = `${completed} / ${length}`;
  $filterCreatedCount.textContent = length.toString();

  todos.forEach((todo) => {
    const $li = document.createElement("li");
    $li.className = `todo-item ${todo.completed ? "complete" : ""}`;
    $li.dataset.id = todo.id;
    $li.onclick = function (e) {
      const currentTarget = e.currentTarget as HTMLLIElement;
      const target = e.target as HTMLElement;
      // AS-IS
      // const id = e.target.closest("li").dataset.id;
      //
      const id = currentTarget.dataset.id;
      const button = target.closest("button");

      const action = button?.dataset.action;

      if (!action || !id) return;

      switch (action) {
        case "remove":
          return handleRemove(id);
        case "complete":
          return handleComplete(id);
      }
    };

    $li.innerHTML = `
            <button class="complete-button ${
              todo.completed ? "completed" : ""
            }" data-action="complete">
              <i class="fa-solid fa-check"></i>
            </button>
            <span class="content"
              >${todo.content}</span>
            <button class="remove-button" data-action="remove">
              <i class="fa-regular fa-trash-can"></i>
            </button>
    `;

    $fragment.appendChild($li);
  });

  $.todos?.appendChild($fragment);
}

export function renderFilterList() {
  if (!$.todos) return;
  $.todos.innerHTML = "";

  const isEmpty = state[STORAGE_KEY.TODOS].length === 0;

  if (isEmpty) {
    $.todos.innerHTML = `<li class="empty-item">
            <i class="fa-regular fa-clipboard"></i>
            <h2>필터된 할일이 없습니다.</h2>
          </li>`;

    return;
  }

  renderTodoList(state.todos.filter((todo) => !!todo.completed));
}

export function renderInitTodoList() {
  if (!$.todos) return;
  $.todos.innerHTML = "";

  const isEmpty = state.todos.length === 0;

  if (isEmpty) {
    $.todos.innerHTML = `<li class="empty-item">
            <i class="fa-regular fa-clipboard"></i>
            <h2>할일이 없습니다.</h2>
          </li>`;

    return;
  }

  renderTodoList(state.todos);
}

($.inputForm as HTMLElement).addEventListener("submit", handleSubmit);
