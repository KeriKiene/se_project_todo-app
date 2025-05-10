import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
//const section = document.querySelector("#todos");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const addTodoButton = document.querySelector(".button_action_add");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});
addTodoPopup.setEventListeners();

function generateTodo(data) {
  console.log("Generating todo with data:", data);
  const todo = new Todo(data, "#todo-template", (todoId) => {
    console.log(`Todo with ID ${todoId} was deleted`);
  });
  const todoElement = todo.getView();
  console.log("Generated todo element:", todoElement);
  return todoElement;
}

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

console.log("Initial todos:", initialTodos);

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id };
//   section._renderer(values);
//   addTodoPopup.close();
//   newTodoValidator.resetValidation();
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

function handleTodoDelete(todoId) {
  console.log(`Todo with ID ${todoId} was deleted`);
}
