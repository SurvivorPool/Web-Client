import { initialState as initialAuthState } from "./Common/Auth/Reducer/authReducer";

export default function loadPreviousState() {
    return {
        auth: initialAuthState,
    }
}