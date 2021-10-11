import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './index';

const middleware = [thunk];

const initialState = {};

const store = createStore(rootReducers, initialState, applyMiddleware(...middleware));
export default store;