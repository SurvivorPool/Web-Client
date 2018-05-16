import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import loadPreviousState from './loadPreviousState';

const storeReducers = combineReducers({});

function getMiddleware() {
    const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

    return composeEnhancer(
        applyMiddleware(
            thunk
        )
    );
}

const store = createStore(
    storeReducers,
    loadPreviousState(),
    getMiddleware()
);

export default store;