import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import todoApp from './reducers';
import { addTodo,
    toggleTodo,
    setVisibilityFilter,
    fetchTodos,
    saveTodos } from './actions';
import { drawUI,
    registerAddTodo,
    registerToggle,
    registerChangeFilter,
    registerLoadTodos,
    registerSaveTodos
} from './ui';



const store = createStore(todoApp, applyMiddleware(thunkMiddleware));

const unsubscribe = store.subscribe(() => 
    drawUI(store.getState())
);

registerAddTodo((name) => store.dispatch(addTodo(name)));
registerToggle((index) => store.dispatch(toggleTodo(index)));
registerChangeFilter((filterName) => store.dispatch(setVisibilityFilter(filterName)));
registerLoadTodos(() => store.dispatch(fetchTodos()));
registerSaveTodos(() => store.dispatch(saveTodos(store.getState().todos)));
