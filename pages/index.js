import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const section = document.querySelector("#todos");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const addTodoButton = document.querySelector(".button_action_add");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", (todoId) => {
    console.log(`Todo with ID ${todoId} was deleted`);
  });
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".todos");

  const renderTodo = (item) => {
    const todo = generateTodo(item);
    section.appendChild(todo);
  };

  initialTodos.forEach((item) => {
    renderTodo(item);
  });
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

function handleTodoDelete(todoId) {
  console.log(`Todo with ID ${todoId} was deleted`);
}
