import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  INIT_FETCH_REQUEST,
  END_FETCH_REQUEST,
  RECEIVE_TODOS
} from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    case RECEIVE_TODOS:
      return action.todos;
    default:
      return state
  }
}

const initialConectionStatus = {
  isLoading: false
};

function conectionStatus(state = initialConectionStatus, action) {
  switch (action.type) {
    case INIT_FETCH_REQUEST: 
      return { isLoading: true };
    case END_FETCH_REQUEST:
      return { isLoading: false };
  }
  return state;
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  conectionStatus
});

export default todoApp