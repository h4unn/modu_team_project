// index.ts
import $ from "./element";
import { renderFilterList, renderInitTodoList } from "./todos";
renderInitTodoList();

(() => {

  $.filterGroup?.addEventListener("click", (e) => {
    const $target = e.target as HTMLElement;
    console.log(e);
    const button = $target.closest("button");

    if (button) {
      (e.currentTarget as HTMLElement)
        ?.querySelectorAll("button")
        ?.forEach((button) => {
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
    }
  });
})();
