import { initialState as initialAuthState } from "./reducers/authReducer";

export default function loadPreviousState() {
  return {
    auth: initialAuthState,
  };
}
