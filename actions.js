/*
 * action types
 */
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const INIT_FETCH_REQUEST = 'INIT_FETCH_REQUEST';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const END_FETCH_REQUEST = 'END_FETCH_REQUEST';
/*
 * other constants
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

function initRequest() {
  return { type: INIT_FETCH_REQUEST };
}

function receiveTodos(todos) {
  return { type: RECEIVE_TODOS, todos: todos };
}

function endFetchRequest() {
  return { type: END_FETCH_REQUEST }
}

export function saveTodos(todos) {
  return function (dispatch) {
    dispatch(initRequest())
    fetch('/todo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todos)
    })
    .then(data => {
      dispatch(endFetchRequest());
    })
  }
}

export function fetchTodos() {
  return function (dispatch) {
    dispatch(initRequest());
    fetch('/todo', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(raw => raw.json())
    .then(data => {
      dispatch(receiveTodos(data));
      dispatch(endFetchRequest());
    })
  }
}