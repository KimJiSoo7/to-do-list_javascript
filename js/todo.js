const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input"); // document.querySelector(#todo-form input) 
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDoArray = [];

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDoArray = toDoArray.filter(item => item.id !== parseInt(li.id));
    saveToDo();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo)
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function saveToDo(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDoArray)); // [a,b,c] ->stringify  '["a","b","c"]'
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj={
        text: newTodo,
        id: Date.now(),
    }
    toDoArray.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDo();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDoArray = parsedToDos;
    parsedToDos.forEach(paintToDo);
}