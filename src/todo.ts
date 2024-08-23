import "./main";
import "./styles/todo.scss";
import $ from "./todo/element";
import { TODO_STATE } from "./todo/constants";
import { renderFilterList, renderInitTodoList } from "./todo/todos";

(() => {
   renderInitTodoList();
   $.filterGroup?.addEventListener("click", (e) => {
      const $target = e.target as HTMLElement;
      const button = $target.closest("button");
      if (button) {
         const targetDataset = $target.dataset.action;
         TODO_STATE.STATE = targetDataset!;
         console.log(TODO_STATE.STATE);
         (e.currentTarget as HTMLElement)?.querySelectorAll("button")?.forEach((button) => {
            if (button.classList.contains("active")) {
               button?.classList?.remove("active");
            }
         });
         button?.classList.add("active");
      }
      const action = button?.dataset.action;
      switch (action) {
         case "completed":
            return renderFilterList();
         case "created":
            return renderInitTodoList();
         default:{
            return renderFilterList(TODO_STATE.STATE);
         }
      }
   });
})();
