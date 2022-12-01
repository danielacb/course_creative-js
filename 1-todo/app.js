const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", onFormSubmit);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}

function onFormSubmit(event) {
  const todo = todoInput.value;
  event.preventDefault();
  addTodo(todo);
  saveToLocalStorage(todo);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;

  if (item.classList[0] === "trash-btn") {
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => todo.remove());
  }

  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
  }

  removeFromLocalStorage(todo);
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        todo.style.display = "flex";
        break;
    }
  });
}

function getFromLocalStorage() {
  let todos;
  const localTodos = localStorage.getItem("todos");
  if (localTodos) {
    todos = JSON.parse(localTodos);
  } else {
    todos = [];
  }

  return todos;
}

function getTodos() {
  const todos = getFromLocalStorage();

  todos.forEach((todo) => {
    addTodo(todo);
  });
}

function saveToLocalStorage(todo) {
  const todos = getFromLocalStorage();

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeFromLocalStorage(todo) {
  const todos = getFromLocalStorage();

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
