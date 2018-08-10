import { initialState as initialAuthState } from "./Common/Auth/Reducer/authReducer";
import { initialState as initialUserState } from "./Common/Auth/Reducer/userReducer";
import { initialState as initialLeagueState } from "./League/Reducer/leagueReducer";

export default function loadPreviousState() {
    return {
        auth: initialAuthState,
        league: initialLeagueState,
        user: initialUserState,
    }
}