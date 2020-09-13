import { useMemo } from "react";
import { createStore } from "redux";

import reducers from "./reducers";
import middleware from "./middleware";
import loadPreviousState from "./loadPrevState";

let store;

function initStore(initialState) {
  return createStore(reducers, loadPreviousState(), middleware());
}

export const initializeStore = (preLoadedState) => {
  let _store = store || initStore(preLoadedState);

  if (preLoadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preLoadedState,
    });

    store = undefined;
  }

  if (typeof window === "undefined") {
    return _store;
  }

  if (!store) {
    store = _store;
  }

  return _store;
};

export function useStore(initialState) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
