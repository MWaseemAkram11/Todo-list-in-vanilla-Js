const text = document.getElementById("text");

const addTaskButton= document.getElementById("add-task-btn");

const saveTaskButton = document.getElementById("save-todo-btn");

const listBox = document.getElementById("listBox");

const saveInd = document.getElementById("saveIndex");

let todoArray = [];
var delSelectedTask={};
var editSelectedTask={};

displayTodo();
addTaskButton.addEventListener("click" ,(norefresh)=>{
    // norefresh.preventDefault();
    // alert("button is clicked");
    if(text.value==""){
        alert("please write some thing");

    }
   else{
    let todo = localStorage.getItem("todo");
    if(todo === null){
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    todoArray.push(text.value);
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
   }
});

///
function displayTodo() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todo);
    }
    let htmlCode = "";
    todoArray.forEach((list, ind) => {
      htmlCode += `<div class="bg d-flex justify-content-sm-between"><p>${list}</p>
      <button class="btn btn-success"  onclick='edit(${ind})' >Edit</button>
      <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete" onclick='delselectTodo(${ind})'>Remove</button>
      </div>`;
    });
    listBox.innerHTML = htmlCode;
   }
   function delselectTodo(ind){
    delSelectedTask = ind;
   }
   function editSelectedTask(ind){
       editSelectedTask = ind;
   }

function deleteTodo() {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(delSelectedTask, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
    }

function edit(ind) {
    saveInd.value = ind;
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    text.value = todoArray[ ind];
    addTaskButton.style.display = "none";
    saveTaskButton.style.display = "block";
   }

saveTaskButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = saveInd.value;
    todoArray[id] = text.value;
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
});