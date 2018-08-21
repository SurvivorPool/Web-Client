import { initialState as initialAuthState } from "./Common/Auth/Reducer/authReducer";
import { initialState as initialUserState } from "./Common/Auth/Reducer/userReducer";
import { initialState as initialLeagueState } from "./League/Reducer/leagueReducer";
import { initialState as initialLeaguesState } from "./League/Reducer/leaguesReducer";
import { initialState as initialPlayerLeaguesState } from "./League/Reducer/playerLeaguesReducer";
import { initialState as initialPlayerTeamState } from "./PlayerTeam/Reducer/playerTeamReducer";
import { initialState as initialGamesState } from "./Games/Reducer/gamesReducer";

export default function loadPreviousState() {
    return {
        auth: initialAuthState,
        games: initialGamesState,
        league: initialLeagueState,
        leagues: initialLeaguesState,
        playerLeagues: initialPlayerLeaguesState,
        playerTeam: initialPlayerTeamState,
        user: initialUserState,
    }
}