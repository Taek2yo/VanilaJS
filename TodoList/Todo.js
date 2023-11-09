// ADD TODO
let todoInput = document.getElementById("new-todo");
let addButton = document.querySelector(".add-button");
addButton.addEventListener("click", addTodo);

function addTodo() {
  const newTodoText = todoInput.value;
  if (newTodoText != "") {
    const todoList = document.querySelector(".todo-item");
    const newTodoItem = document.createElement("li");
    newTodoItem.innerHTML = `
        <input type='checkbox'>
        <label>${newTodoText}</label>
    `;
    todoList.appendChild(newTodoItem);

    newTodoText.value = "";
  }
}

// Change item state
document.addEventListener("change", changeItem);
function changeItem(e) {
  if (e.target.type === "checkbox") {
    const todoItem = e.target.parentElement;
    if (e.target.checked) {
      const completedList = document.querySelector(".completed-list");
      completedList.appendChild(todoItem);

      todoItem.classList.add("completed");
    } else {
      const todoList = document.querySelector(".todo-list");
      todoList.appendChild(todoItem);
      todoItem.classList.remove("completed");
    }
  }
}
