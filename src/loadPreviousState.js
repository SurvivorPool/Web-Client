import { initialState as initialAuthState } from "./Common/Auth/Reducer/authReducer";
import { initialState as initialUserState } from "./Common/Auth/Reducer/userReducer";

export default function loadPreviousState() {
    return {
        auth: initialAuthState,
        user: initialUserState,
    }
}