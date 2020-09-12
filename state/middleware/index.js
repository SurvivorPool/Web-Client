import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middlewares = [thunk];

export default function middleware() {
  return composeWithDevTools(applyMiddleware(...middlewares));
}
