import { VisibilityFilters } from "./actions";

function manageEach(stateElem) {
    let result = '';
    if (Array.isArray(stateElem)) {
        result = manageArray(stateElem);
    } else if (typeof (stateElem) === 'object') {
        result = manageObject(stateElem);
    } else {
        result = managePrimitive(stateElem);
    }
    return result;
}

function manageArray(stateArray) {
    let result = '<ul>';
    stateArray.forEach(element => {
        result += `<li>${ manageEach(element) }</li>`;
    });
    result += '</ul>'
    return result;
}

function manageObject(state) {
    let result = Object.keys(state)
        .map(key => state[key])
        .map(elem => manageEach(elem))
        .join('');
    return result;
}

function managePrimitive(primitive) {
    return `<div>${ primitive }</div>`
}

function all(state) {
    return manageObject(state);
}


let toggleFunction = null;
let changeFilter = null;
let saveTodos = null;
let loadTodos = null;

function createTitleElem(title) {
    let titleElem = document.createElement('span');
    titleElem.innerText = title;
    return titleElem;
}

function createButtonToggle(index) {
    let buttonToggle = document.createElement('button');
    buttonToggle.addEventListener('click', () => {
        toggleFunction(index);
    });
    buttonToggle.innerText = 'Cambiar'
    return buttonToggle;
}
function createCheckbox(checked) {
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    if(checked) {
        input.setAttribute('checked', "true");
    }
    input.setAttribute('disabled', 'true');
    return input;
}
function manageTodo(todo, index) {
    let result = document.createElement('li');
    result.appendChild(createTitleElem(todo.text));
    result.appendChild(createButtonToggle(index));
    result.appendChild(createCheckbox(todo.completed));
    return result;
}

function filter(todos, visibilityFilter) {
    if (visibilityFilter === VisibilityFilters.SHOW_ALL) {
        return todos;
    } else if (visibilityFilter === VisibilityFilters.SHOW_ACTIVE) {
        return todos.filter(todo => !todo.completed)
    } else if (visibilityFilter === VisibilityFilters.SHOW_COMPLETED) {
        return todos.filter(todo => todo.completed);
    }
}

function manageTodos(todos, visibilityFilter) {
    let result = document.createElement('ul');
    todos = filter(todos, visibilityFilter);
    todos.map((todo, index) => result.appendChild(manageTodo(todo, index)));
    return result;
}

function getNodes(state) {
    let result = document.createElement('div');
    result.appendChild(manageTodos(state.todos, state.visibilityFilter));
    return result;
}

function fillFilters() {
    let select = document.getElementById('change-view-select');
    let optionAttributes = Object.keys(VisibilityFilters)
        .map(key => VisibilityFilters[key])
        .map(filter => {
            let option = document.createElement('option')
            option.innerText = filter;
            option.value = filter;
            return option;
        })
        .forEach((node) => select.appendChild(node));
    select.addEventListener('change', (event) => {
        changeFilter(event.target.value);
    })
}
function init() {
    fillFilters();
    document.getElementById('save')
        .addEventListener('click', () => {
            saveTodos();
        })
    document.getElementById('load')
        .addEventListener('click', () => {
            loadTodos();
        });
}

init();

export function drawUI(state) {
    //var result = all(state);
    let contentElement = document.getElementById('content')
    contentElement.innerHTML = '';
    var result = getNodes(state);
    contentElement.appendChild(result);
    document.getElementById('loading')
        .innerText = state.conectionStatus.isLoading ? 'loading...' : '';
}

export function registerAddTodo(fn) {
    document.getElementById('add-todo')
        .addEventListener('submit', (event) => {
            event.preventDefault();
            console.log(event);
            fn(event.target.todoName
                .value)
            event.target.todoName
                .value = '';
        });
}


export function registerToggle(fn) {
    if (toggleFunction === null) {
        toggleFunction = fn;
    }

}

export function registerChangeFilter(fn) {
    if (changeFilter === null) {
        changeFilter = fn;
    }
}

export function registerSaveTodos(fn) {
    if (saveTodos === null) {
        saveTodos = fn;
    }
}

export function registerLoadTodos(fn) {
    if(loadTodos === null) {
        loadTodos = fn;
    }
}
