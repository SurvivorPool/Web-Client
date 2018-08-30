import { initialState as initialAuthState } from "./Common/Auth/Reducer/authReducer";
import { initialState as initialUserState } from "./Common/Auth/Reducer/userReducer";
import { initialState as initialLeagueState } from "./League/Reducer/leagueReducer";
import { initialState as initialLeaguesState } from "./League/Reducer/leaguesReducer";
import { initialState as initialPickState } from "./Picks/Reducer/pickReducer";
import { initialState as initialPlayerLeaguesState } from "./League/Reducer/playerLeaguesReducer";
import { initialState as initialPlayerTeamState } from "./PlayerTeam/Reducer/playerTeamReducer";
import { initialState as initialGamesState } from "./Games/Reducer/gamesReducer";
import { initialState as initialToastsState } from "./Common/Toasts/Reducer/toastsReducer";
import { initialState as initialMessagesState } from "./Messages/Reducer/messagesReducer";

export default function loadPreviousState() {
    return {
        auth: initialAuthState,
        games: initialGamesState,
        league: initialLeagueState,
        leagues: initialLeaguesState,
        messages: initialMessagesState,
        pick: initialPickState,
        playerLeagues: initialPlayerLeaguesState,
        playerTeam: initialPlayerTeamState,
        toasts: initialToastsState,
        user: initialUserState,
    }
}