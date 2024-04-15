import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./global";

export const store = configureStore({
    reducer:{
        global: GlobalReducer
    },
})