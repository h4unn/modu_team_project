const $ = {
  inputForm: document.querySelector("#input-form"),
  addButton: document.querySelector("#add-button"),
  filterGroup: document.getElementById("filter-group"),
  todos: document.querySelector("#todos"),
  filterCreatedButton: document.querySelector(".filter-button.created"),
  filterCompletedButton: document.querySelector(".filter-button.completed"),
  filterImportButton: document.querySelector(".filter-button.import"),
  filterStudyButton: document.querySelector(".filter-button.study"),
  filterPromiseButton: document.querySelector(".filter-button.promises"),
} as const;

export default $;
