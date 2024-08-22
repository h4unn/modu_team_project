import { STORAGE_KEY } from "./constants";
import { Todo } from "./models/Todo.model";
import { renderInitTodoList, state } from "./todos";

export const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const target = e.target as HTMLFormElement;

  const value = (target?.elements as any)["todo"].value;
  if (!value.trim()) return; // 공백문자거나 글자가 있는지 확인
  (target.elements as any)["todo"].value = ""; // 제출되면 input 초기화

  const newTodo = new Todo({ content: value });

  state.todos.push(newTodo);

  state.mapTodo.set(newTodo.id, newTodo);

  const stringState = JSON.stringify(state);

  localStorage.setItem(STORAGE_KEY.STATE, stringState);

  renderInitTodoList();
};

export const handleRemove = (id: string) => {
  state.todos = state.todos.filter((todo) => {
    return todo.id !== id;
  });

  localStorage.setItem(STORAGE_KEY.STATE, JSON.stringify(state));

  renderInitTodoList();
};

export const handleComplete = (id: string) => {
  state.todos = state.todos.map((todo) => {
    return {
      ...todo,
      completed: todo.id === id ? !todo.completed : todo.completed,
    };
  });

  localStorage.setItem(STORAGE_KEY.STATE, JSON.stringify(state));

  renderInitTodoList();
};
