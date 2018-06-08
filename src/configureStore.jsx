import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import loadPreviousState from './loadPreviousState';

import authReducer from "./Common/Auth/Reducer/authReducer";

const storeReducers = combineReducers({
    auth: authReducer,
});

function getMiddleware() {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancer(
        applyMiddleware(
            thunk
        )
    );
}

const store = createStore(
    storeReducers,
    loadPreviousState(),
    getMiddleware(),
);

export default store;