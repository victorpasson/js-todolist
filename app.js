/*
    Selectors
*/

const addform = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

/*
    Events
*/

// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    const todos = JSON.parse(localStorage.getItem('todos'));

    if (todos.length > 0) {
        updateTodos();
    } else {
        const firstTodos = ['Go to the gym', 'Buy some fruits', 'Read a book'];
        localStorage.setItem('todos', JSON.stringify(firstTodos));
        updateTodos();
    }
})

// add todos
addform.addEventListener('submit', e => {
    e.preventDefault();

    // take the todo
    // the trim method removes the white spaces from the beginning and the end of the string
    const todo = e.target.add.value.trim();

    if (todo.length) {
        generateTemplate(todo);
        addTodo(todo);
        addform.reset();
    }

})

// delete todos
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        deleteTodo(
            e.target.parentElement.querySelector('span').textContent
        );
    }

    e.target.classList.toggle('completed');
})

// search todos
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
})

search.parentElement.addEventListener('submit', e => {
    e.preventDefault();
});

/*
    Functions
*/

// generate template
const generateTemplate = todo => {
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="bi bi-trash delete"></i>
        </li>
    `;

    list.innerHTML += html;
}

// filter todos
const filterTodos = term => {
    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'));
}

const updateTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(todo => generateTemplate(todo));
};

const deleteTodo = todo => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
};

const addTodo = todo => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};