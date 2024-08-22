const $ = {
  inputForm: document.querySelector("#input-form"),
  addButton: document.querySelector("#add-button"),
  filterGroup: document.getElementById("filter-group"),
  todos: document.querySelector("#todos"),
  filterCreatedButton: document.querySelector(".filter-button.created"),
  filterCompletedButton: document.querySelector(".filter-button.completed"),
} as const;

export default $;
