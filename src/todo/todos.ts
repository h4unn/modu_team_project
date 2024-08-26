// todos.ts => state, lender function
import { STORAGE_KEY } from "./constants";
import $ from "./element";
import { handleComplete, handleRemove, handleSubmit } from "./feature";
import { Todo } from "./models/Todo.model";

export let state: {
  [STORAGE_KEY.TODOS]: Todo[]; 
  [STORAGE_KEY.MAP_TODO]: Map<string, Todo>; 
} = {
  todos: [] as Todo[],
  mapTodo: new Map<string, Todo>(),
};

if (localStorage.getItem(STORAGE_KEY.STATE)) {
  state = JSON.parse(localStorage.getItem(STORAGE_KEY.STATE) ?? "{}");
  const lastId = state.todos?.slice(-1)[0]?.id.split("-")[1] || "0";
  Todo.index = Number(lastId);
}

export function renderTodoList(todos: Todo[], entity?: Todo[]) {
  const $fragment = document.createDocumentFragment();

  let length = null;
  entity ? length = entity.length : length = todos.length; 
  const completed = todos.filter((todo) => todo.completed);
  
  const importList = entity ? entity.filter((todo) => todo.label === '중요한일').length : todos.filter((todo) => todo.label === '중요한일').length;
  const studyList = entity ? entity.filter((todo) => todo.label === '공부').length : todos.filter((todo) => todo.label === '공부').length;
  const pormiseLise = entity ? entity.filter((todo) => todo.label === '약속').length : todos.filter((todo) => todo.label === '약속').length;

  const $filterCompleteCount = $.filterCompletedButton?.querySelector(".count");
  const $filterCreatedCount = $.filterCreatedButton?.querySelector(".count");
  const $filterImportCount = $.filterImportButton?.querySelector(".count") as HTMLElement;
  const $filterStudyCount = $.filterStudyButton?.querySelector(".count") as HTMLElement;
  const $filterPromiseCount = $.filterPromiseButton?.querySelector(".count") as HTMLElement;
  

if (!$filterCompleteCount || !$filterCreatedCount) return;
  
  $filterCompleteCount.textContent = `${completed.length} / ${length}`;
  $filterCreatedCount.textContent = length.toString();

  $filterImportCount.textContent = `${completed.filter(completedTodo => completedTodo.label === '중요한일').length} / ${importList}`;
  $filterStudyCount.textContent = `${completed.filter(completedTodo => completedTodo.label === '공부').length} / ${studyList}`;
  $filterPromiseCount.textContent = `${completed.filter(completedTodo => completedTodo.label === '약속').length} / ${pormiseLise}`;
  
  todos.forEach((todo) => {
    const $li = document.createElement("li");
    const classes = `todo-item ${todo.completed ? "complete " : ""}`;
    $li.className = classes;
    switch(todo.label){
      case '중요한일': $li.className += 'import';break
      case '공부': $li.className += 'study';break
      case '약속': $li.className += 'promise';break
    }
    $li.dataset.id = todo.id;
    $li.onclick = function (e) {
      const currentTarget = e.currentTarget as HTMLLIElement;
      const target = e.target as HTMLElement;
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
            <button class="complete-button ${todo.completed ? "completed" : ""}" data-action="complete">
              <i class="fa-solid fa-check"></i>
            </button>
            <span class="todo_inn_label">${todo.label}</span>
            <span class="content">${todo.content}</span>
            <button class="remove-button" data-action="remove">
              <i class="fa-regular fa-trash-can"></i>
            </button>
    `;

    $fragment.appendChild($li);
  });

  $.todos?.appendChild($fragment);
}

export function renderFilterList(todo_state?:string) {
  if (!$.todos) return;
  $.todos.innerHTML = "";

  const isEmpty = state[STORAGE_KEY.TODOS].length === 0;

  if (isEmpty) {
    $.todos.innerHTML = `<li class="empty-item">
            <h2>필터된 할일이 없습니다.</h2>
          </li>`;

    return;
  }
  switch(todo_state){
    case 'import': renderTodoList(state.todos.filter(todo => todo.label === '중요한일'),state.todos);break
    case 'study': renderTodoList(state.todos.filter(todo => todo.label === '공부'),state.todos);break
    case 'promis': renderTodoList(state.todos.filter(todo => todo.label === '약속'),state.todos);break
  }
  todo_state ?? renderTodoList(state.todos.filter((todo) => !!todo.completed),state.todos);
}

export function renderInitTodoList() {
  if (!$.todos) return;
  $.todos.innerHTML = "";

  const isEmpty = state.todos.length === 0;

  if (isEmpty) {
    $.todos.innerHTML = `<li class="empty-item">
            <h2>할일이 없습니다.</h2>
          </li>`;

    return;
  }
  renderTodoList(state.todos);
}

export function homeRenderInit(){
  if (!$.todos) return;
  $.todos.innerHTML = "";

  const isEmpty = state.todos.length === 0;

  if (isEmpty) {
    $.todos.innerHTML = `<li class="empty-item">
            <h2>할일이 없습니다.</h2>
          </li>`;
    return;
  }
  if(state.todos.length > 0){
    const stateResult = state.todos;
    stateResult.reverse();
    homeRenderTodoList(stateResult);
  }
  

}
export function homeRenderTodoList(todos:Todo[]){
  const $fragment = document.createDocumentFragment();
  todos.forEach((todo,idx) => {
    if (idx > 3){return};
    const $li = document.createElement("li");
    const classes = `todo-item ${todo.completed ? "complete " : ""}`;
    $li.className = classes;
    $li.dataset.id = todo.id;

    $li.onclick = function (e) {
      const currentTarget = e.currentTarget as HTMLLIElement;
      const target = e.target as HTMLElement;
      const id = currentTarget.dataset.id;
      const button = target.closest("button");

      const action = button?.dataset.action;

      if (!action || !id) return;
      switch (action) {
        case "remove":
          return handleRemove(id,'home');
        case "complete":
          return handleComplete(id,'home');
      }
    };

    $li.innerHTML = `
            <button class="complete-button ${todo.completed ? "completed" : ""}" data-action="complete">
              <i class="fa-solid fa-check"></i>
            </button>
            <span class="todo_inn_label">${todo.label}</span>
            <span class="content">${todo.content}</span>
            <button class="remove-button" data-action="remove">
              <i class="fa-regular fa-trash-can"></i>
            </button>
    `;

    $fragment.appendChild($li);
  });
  $.todos?.appendChild($fragment);
}

($.inputForm as HTMLElement)?.addEventListener("submit", handleSubmit);
