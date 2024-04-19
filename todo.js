document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("addItem");
  const submitBtn = document.getElementById("submit");
  const showTodo = document.getElementById("container");
  let todoList = [];
  submitBtn.addEventListener("click", handleClick);

  function handleClick() {
    const newTodo = input.value;
    const todoArray = { title: newTodo };
    todoList.push(todoArray);
    saveTodoToLocalStorage();
  }

  function saveTodoToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
  function loadTodoFromLocalStorage() {
    const savedTodo = JSON.parse(localStorage.getItem("todoList"));
    if (savedTodo) {
      todoList = savedTodo;
    } else {
      todoList = [];
    }
  }

  function renderTodo() {
    loadTodoFromLocalStorage();
    input.value = "";
    todoList.forEach((item, index) => {
      const todoListItem = document.createElement("li");
      todoListItem.textContent = item.title;
      showTodo.appendChild(todoListItem);
      const btnDiv = document.createElement("div");
      const remove = document.createElement("button");
      const completed = document.createElement("button");
      const select = document.createElement("select");
      const highOption = document.createElement("option");
      const lowOption = document.createElement("option");
      highOption.textContent = "High priority";
      lowOption.textContent = "Low priority";

      completed.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></svg>';
      remove.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4zM6 6v14h12V6zm3 3h2v8H9zm4 0h2v8h-2z"/></svg>';

      todoListItem.appendChild(btnDiv);
      btnDiv.appendChild(remove);
      btnDiv.appendChild(completed);
      btnDiv.appendChild(select);
      select.appendChild(highOption);
      select.appendChild(lowOption);
      //////giving classList
      remove.classList.add("remove-btn");
      completed.classList.add("completed-btn");
      btnDiv.classList.add("btn-div");
      todoListItem.classList.add("todo-element");

      //completed.addEventListener("click", function () {
      //showTodo.classList.add("completed");
      //});
      completed.addEventListener("click", function () {
        //todoListItem.classList.toggle("completed");
        todoListItem.textContent = "completed ✔️";
        setTimeout(function () {
          todoList.splice(index, 1);
          saveTodoToLocalStorage();
          showTodo.removeChild(todoListItem);
        }, 1500);
      });
      ////button div

      remove.addEventListener("click", function () {
        // Remove the corresponding item from the todoList array
        todoList.splice(index, 1);
        // Save the updated todoList to localStorage
        saveTodoToLocalStorage();
        // Remove the corresponding DOM elements from the showTodo list
        showTodo.removeChild(todoListItem);
        //showTodo.removeChild(remove); // Remove the remove button
        //showTodo.removeChild(completed); // Remove the completed button
      });
    });
  }

  /////high,low priority
  ///select

  renderTodo();
});
