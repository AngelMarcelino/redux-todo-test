import { createStore } from 'redux';
import todoApp from './reducers';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions';
import { drawUI, registerAddTodo, registerToggle, registerChangeFilter } from './ui';



const store = createStore(todoApp);

const unsubscribe = store.subscribe(() => 
    drawUI(store.getState())
);

registerAddTodo((name) => store.dispatch(addTodo(name)));
registerToggle((index) => store.dispatch(toggleTodo(index)));
registerChangeFilter((filterName) => store.dispatch(setVisibilityFilter(filterName)));

