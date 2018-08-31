import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import thunk from 'redux-thunk';

import loadPreviousState from './loadPreviousState';

import authReducer from "./Common/Auth/Reducer/authReducer";
import gamesReducer from "./Games/Reducer/gamesReducer";
import leagueReducer from "./League/Reducer/leagueReducer";
import leaguesReducer from "./League/Reducer/leaguesReducer";
import messagesReducer from "./Messages/Reducer/messagesReducer";
import pickReducer from "./Picks/Reducer/pickReducer";
import playerLeaguesReducer from "./League/Reducer/playerLeaguesReducer";
import playerTeamReducer from "./PlayerTeam/Reducer/playerTeamReducer";
import playerTeamsReducer from "./PlayerTeam/Reducer/playerTeamsReducer";
import toastsReducer from "./Common/Toasts/Reducer/toastsReducer"
import userReducer from "./Common/Auth/Reducer/userReducer";
import usersReducer from "./Common/Auth/Reducer/usersReducer";

import authMiddleware from "./Common/Auth/Middleware/authMiddleware";

export const history = createBrowserHistory();

const storeReducers = combineReducers({
    auth: authReducer,
    games: gamesReducer,
    league: leagueReducer,
    leagues: leaguesReducer,
    messages: messagesReducer,
    pick: pickReducer,
    playerLeagues: playerLeaguesReducer,
    playerTeam: playerTeamReducer,
    playerTeams: playerTeamsReducer,
    toasts: toastsReducer,
    user: userReducer,
    users: usersReducer,
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