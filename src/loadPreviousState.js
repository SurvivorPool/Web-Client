import { initialState as initialAuthState } from "./Common/Auth/Reducer/authReducer";
import { initialState as initialUserState } from "./Common/Auth/Reducer/userReducer";
import { initialState as initialLeagueState } from "./League/Reducer/leagueReducer";
import { initialState as initialLeaguesState } from "./League/Reducer/leaguesReducer";
import { initialState as initialPlayerLeaguesState } from "./League/Reducer/playerLeaguesReducer";

export default function loadPreviousState() {
    return {
        auth: initialAuthState,
        league: initialLeagueState,
        leagues: initialLeaguesState,
        playerLeagues: initialPlayerLeaguesState,
        user: initialUserState,
    }
}