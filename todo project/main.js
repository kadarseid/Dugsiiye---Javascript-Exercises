const todoForm = document.querySelector("#todo-form");
const inputEl = document.querySelector(".todo-input");
const todoListEl = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = getTasksFromLocalStorage();

  tasks.forEach((task) => {
    addTaskToDOM(task);
  });
}

todoForm.addEventListener("submit", addTodo);

function addTodo(event) {
  event.preventDefault();

  const todo = inputEl.value.trim();

  if (todo !== "") {
    const task = {
      id: Date.now(),
      text: todo,
      completed: false,
    };

    addTaskToDOM(task);
    saveToLocalStorage(task);
  }

  inputEl.value = "";
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.className = `todo-item ${task.completed ? "completed" : ""}`;
  li.dataset.id = task.id;
  todoListEl.appendChild(li);
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = `${task.completed ? "checked" : ""}`;
  li.appendChild(input);
  const span = document.createElement("span");
  span.classList.add("span");
  span.textContent = `${task.text}`;
  li.appendChild(span);
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  li.appendChild(editButton);
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  li.appendChild(deleteButton);

  attachEventListener(li, task);
}

function attachEventListener(li, task) {
  const checkbox = li.querySelector("input");
  const deleteButton = li.querySelector(".delete-button");
  const editButton = li.querySelector(".edit-button");

  deleteButton.addEventListener("click", function () {
    handleDelete(task.id, li);
  });

  editButton.addEventListener("click", function () {
    handleEdit(task.id, li);
  });

  checkbox.addEventListener("change", function () {
    toggleTaskCompletion(task.id, li, checkbox.checked);
  });
}

function handleDelete(id, li) {
  let tasks = getTasksFromLocalStorage();

  tasks = tasks.filter((task) => task.id != id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  li.remove();
}

function handleEdit(id, li) {
  const taskText = li.querySelector(".span");

  const newTaskText = prompt("Edit your task:", taskText.textContent);

  if (newTaskText !== null && newTaskText.trim() !== "") {
    updateTask(id, newTaskText);
    taskText.textContent = newTaskText;
  }
}

function updateTask(id, newTaskText) {
  const tasks = getTasksFromLocalStorage();

  const task = tasks.find((task) => task.id === id);

  if (task) {
    task.text = newTaskText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function toggleTaskCompletion(id, li, isCompleted) {
  const tasks = getTasksFromLocalStorage();

  const task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = isCompleted;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.classList.toggle("completed", isCompleted);
  }
}
function saveToLocalStorage(task) {
  const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  oldTasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

function getTasksFromLocalStorage() {
  const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return oldTasks;
}
