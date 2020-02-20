import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../Reducers/index'
// import StateLoader from "./stateLoader"

// const stateLoader = new StateLoader();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
// store.subscribe(() => {
//     stateLoader.saveState(store.getState());
// });
export default store;