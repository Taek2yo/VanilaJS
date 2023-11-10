// ADD TODO
let todoInput = document.getElementById("new-todo");
let addButton = document.querySelector(".add-button");

addButton.addEventListener("click", addTodo);
function addTodo() {
  const newTodoText = todoInput.value;
  if (newTodoText !== "") {
    const todoList = document.querySelector(".todo-list");
    const newTodoItem = document.createElement("li");
    newTodoItem.classList.add("todo-item");
    newTodoItem.innerHTML = `
        <input type='checkbox'>
        <label>${newTodoText}</label>
        <button class="delete-button">del</button>
        <button class="edit-button">edit</button>
    `;
    todoList.appendChild(newTodoItem);

    todoInput.value = "";
  }
}
todoInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

function toggleButton(parent, button, buttonClass) {
  if (button) {
    parent.removeChild(button);
  } else {
    const newButton = document.createElement("button");
    newButton.classList.add(buttonClass);
    newButton.textContent = buttonClass === "delete-button" ? "del" : "edit";
    parent.appendChild(newButton);
  }
}
/**
 * TODO : study
 *  Node, Element / parentNode, parentElement, children, childNode
 *
 *  */

// Change item state
document.addEventListener("change", changeItem);
function changeItem(e) {
  if (e.target.type === "checkbox") {
    const todoItem = e.target.parentElement;
    const deleteButton = todoItem.querySelector(".delete-button");
    const editButton = todoItem.querySelector(".edit-button");

    const completedList = document.querySelector(".completed-list");
    const todoList = document.querySelector(".todo-list");

    if (e.target.checked) {
      completedList.appendChild(todoItem);
      todoItem.classList.add("completed");
    } else {
      todoList.appendChild(todoItem);
      todoItem.classList.remove("completed");
    }

    toggleButton(todoItem, deleteButton, "delete-button");
    toggleButton(todoItem, editButton, "edit-button");
  }
}

// Delete Todo
document.addEventListener("click", deleteItem);
function deleteItem(e) {
  const btn = e.target;
  if (btn.classList.contains("delete-button")) {
    const todoItem = btn.parentElement;
    const parentList = todoItem.parentElement;
    parentList.removeChild(todoItem);
  }
}

// Edit Todo
document.addEventListener("click", editItem);
function editItem(e) {
  const btn = e.target;
  if (btn.classList.contains("edit-button")) {
    const todoLabel = btn.parentElement.querySelector(".todo-label");

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = todoLabel.textContent;
    inputField.classList.add("edit-input");

    todoLabel.replaceWith(inputField);

    inputField.focus();

    inputField.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        todoLabel.textContent = inputField.value;
        inputField.replaceWith(todoLabel);
      }
    });
  }
}

