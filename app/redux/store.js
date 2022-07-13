import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

import app from "./appSlice";

const combinedReducer = combineReducers({
  app,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = { ...state, ...action.payload };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const store = configureStore({
  reducer: masterReducer,
  devTools: true,
});

export const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { debug: true });
