import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './Reducers/userReducer'


const middleware = applyMiddleware(thunk)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( userReducer, composeEnhancers(middleware) );

export default store;
