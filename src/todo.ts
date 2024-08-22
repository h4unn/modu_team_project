import "./main";
import "./styles/todo.scss";

const formObject = document.querySelector('#input-form');
const storageItem = localStorage.getItem('TodoList');

console.log(storageItem);
