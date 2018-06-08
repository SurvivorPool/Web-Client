import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import loadPreviousState from './loadPreviousState';

import authReducer from "./Common/Auth/Reducer/authReducer";

import authMiddleware from "./Common/Auth/Middleware/authMiddleware";

const storeReducers = combineReducers({
    auth: authReducer,
});

function getMiddleware() {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancer(
        applyMiddleware(
            thunk,
            authMiddleware
        )
    );
}

const store = createStore(
    storeReducers,
    loadPreviousState(),
    getMiddleware(),
);

export default store;