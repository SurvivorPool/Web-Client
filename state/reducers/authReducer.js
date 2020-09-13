import { getItem } from "../../component/LocalStorage";

const prevAuth = getItem("auth");

export const initialState = {
  loading: false,
  data:
    prevAuth && prevAuth.uid
      ? {
          ...prevAuth,
          isLoggedIn: true,
          token: prevAuth.token,
        }
      : null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    /*    case loginAction.ACTION:
      return {
        ...state,
        loading: true,
      };
    case fireBaseLoggedInAction.ACTION:
      return {
        data: {
          ...state.data,
          ...action.payload,
          isLoggedIn: !!action.payload.uid,
        },
        loading: false,
        error: false,
      };
    case loginAction.ACTION_COMPLETED:
      return {
        data: {
          ...state.data,
          ...action.data,
        },
        loading: false,
        error: false,
      };
    case loginAction.ACTION_FAILED:
      return {
        data: null,
        loading: false,
        error: action.error,
      };
    case useAuthTokenAction.ACTION:
      return {
        ...state,
        data: {
          ...state.data,
          token: action.payload || action.payload.token,
        },
      };*/
    default:
      return state;
  }
}
