let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (!Array.isArray(parsedTodoList)) {
        return [];
    }
    return parsedTodoList;
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value.trim();

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount++;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
};

function findTodoById(todoId) {
    return todoList.find(eachTodo => "todo" + eachTodo.uniqueNo === todoId);
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObject = findTodoById(todoId);
    todoObject.isChecked = !todoObject.isChecked;
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        return "todo" + eachTodo.uniqueNo === todoId;
    });
    todoList.splice(todoObjectIndex, 1);
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash-can", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

function displayEmptyMessage() {
    if (todoList.length === 0) {
        let emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No tasks available!";
        todoItemsContainer.appendChild(emptyMessage);
    }
}

function loadTodos() {
    if (todoList.length > 0) {
        todoList.forEach(todo => {
            createAndAppendTodo(todo);
        });
    } else {
        displayEmptyMessage();
    }
}

loadTodos();
