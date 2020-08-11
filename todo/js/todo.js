let todoItems = [];
let doneItems = [];

//add todo from input to array
function addTodo(text) {
    var d = new Date().toLocaleString();
    const todo = {
        text,
        checked: false,
        id: Date.now(),
        date: d,
        move: false,
    };

    todoItems.push(todo);
    renderTodo(todo);
}

function moveTodo(todo) {
    const done = {
        text: todo.text,
        checked: todo.checked,
        id: todo.id,
        date: todo.date,
        move: todo.move,
    };

    doneItems.push(done);
    renderDone(done);
}

//rendering todo list
function renderTodo(todo) {
    const list = document.querySelector('#todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    
    if(todo.deleted) {
        item.remove();
        return
    }

    if(todo.move) {
        moveTodo(todo);
    }

    const isChecked = todo.checked ? 'done':'';
    
    //create element <li>
    const node = document.createElement("li");
    node.setAttribute('class', `todo-box ${isChecked}`);
    node.setAttribute('data-key', todo.id);

    node.innerHTML = `
        <div id="${todo.id}">
            <h5>${todo.date}</h5>
            <span class="ion-ios-checkmark-outline click"></span>
            <span class="ion-ios-close-outline delete"></span>
            <div class="todo-content">
                <p>${todo.text}</p>
            </div>
        </div>
    `;

    //if todo already in list
    if(item) {
        list.removeChild(item);
    }

    else {
    //append all created <li> element
    list.append(node);
    }
}

//render done list
function renderDone(done) {
    const doneList = document.querySelector('#done-list');
    const doneItem = document.querySelector(`[data-key='${done.id}']`);

    if(done.deleted) {
        doneItem.remove()
        return
    }

    const node = document.createElement("li");
    node.setAttribute('class', `todo-box done`);
    node.setAttribute('data-key', done.id);

    node.innerHTML = `
        <div id="${done.id}">
            <h5>${done.date}</h5>
            <span class="ion-ios-close-outline delete"></span>
            <div class="todo-content">
                <p>${done.text}</p>
            </div>
        </div>
    `;

    doneList.append(node);
}

//select the form
const form = document.querySelector('.form-section');

//add event listener
form.addEventListener('submit', event => {
    event.preventDefault(); //prevent form refreshing
    const input = document.querySelector('.form-control'); //select text
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

//make list be line-through
const list = document.querySelector('#todo-list');
list.addEventListener('click', event => {
    
    //get node id if clicked checkmark
    if(event.target.classList.contains('click')) {
        const itemKey = event.target.parentElement.id;
        toogleDone(itemKey);
    }

    //get node id if clicked cross-mark
    if(event.target.classList.contains('delete')) {
        const itemKey = event.target.parentElement.id;
        deleteTodo(itemKey);
    }
});

//event listener for done list
const doneList = document.querySelector('#done-list');
doneList.addEventListener('click', event => {
    if(event.target.classList.contains('delete')) {
        const itemKey = event.target.parentElement.id;
        deleteDone(itemKey);
    }
});

//change element checked in array to the opposite
function toogleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    todoItems[index].move = !todoItems[index].move;
    renderTodo(todoItems[index]);
}

//delete todo
function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

//delete done
function deleteDone(key) {
    const index = doneItems.findIndex(item => item.id === Number(key));
    const done = {
        deleted: true,
        ...doneItems[index]
    };
    doneItems = doneItems.filter(item => item.id !== Number(key));
    renderDone(done);
}