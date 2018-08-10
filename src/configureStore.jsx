import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import thunk from 'redux-thunk';

import loadPreviousState from './loadPreviousState';

import authReducer from "./Common/Auth/Reducer/authReducer";
import userReducer from "./Common/Auth/Reducer/userReducer";
import leagueReducer from "./League/Reducer/leagueReducer";

import authMiddleware from "./Common/Auth/Middleware/authMiddleware";

export const history = createBrowserHistory();

const storeReducers = combineReducers({
    auth: authReducer,
    league: leagueReducer,
    user: userReducer,
});

function getMiddleware() {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancer(
        applyMiddleware(
            thunk,
            authMiddleware,
            routerMiddleware(history),
        )
    );
}

const store = createStore(
    connectRouter(history)(storeReducers),
    loadPreviousState(),
    getMiddleware(),
);

export default store;