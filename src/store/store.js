import { combineReducers, configureStore } from "@reduxjs/toolkit";

import timer from "./slice/timerSlice";

const reducers = {
  timer,
};

const combinedReducer = combineReducers(reducers);

export const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
