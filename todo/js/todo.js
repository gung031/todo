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
    };

    todoItems.push(todo);
    renderTodo(todo);
}

//rendering todo
function renderTodo(todo) {
    const list = document.querySelector('#todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    
    if(todo.deleted) {
        item.remove();
        return
    }

    const isChecked = todo.checked ? 'done':'';
    
    //create element <li>
    const node = document.createElement("li");
    node.setAttribute('class', `todo-box ${isChecked}`);
    node.setAttribute('data-key', todo.id);

    node.innerHTML = `
        <div id="${todo.id}">
            <h5>${todo.date}</h5>
            <span id="${todo.id}" class="ion-ios-checkmark-outline click"></span>
            <span class="ion-ios-close-outline delete"></span>
            <div class="todo-content">
                <p>${todo.text}</p>
            </div>
        </div>
    `;

    //if todo already in list
    if(item) {
        renderDone(todo);
        list.removeChild(item);
        //list.replaceChild(node, item);
    }
    else {
    //append all created <li> element
    list.append(node);
    }
}

//rendering done
function renderDone(todo) {
    const done = document.querySelector('#done-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    
    //console.log(todoItems[0]);

    if(todo.deleted) {
        item.remove();
        return
    }
    
    const isChecked = 'done';

    //create element <li>
    const node = document.createElement("li");
    node.setAttribute('class', `todo-box ${isChecked}`);
    node.setAttribute('data-key', todo.id);

    node.innerHTML = `
        <div id="${todo.id}">
            <h5>${todo.date}</h5>
            <span class="ion-ios-close-outline delete"></span>
            <div class="todo-content">
                <p>${todo.text}</p>
            </div>
        </div>
    `;

    done.append(node);
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
})

//change element checked in array to the opposite
function toogleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
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
