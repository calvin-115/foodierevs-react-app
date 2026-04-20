"use client";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../account/reducer";

const store = configureStore({
    reducer: {
        accountReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;