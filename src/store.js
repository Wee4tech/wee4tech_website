import { configureStore } from "@reduxjs/toolkit";

import componentStateReducer from "./redux/slices/componentState/action";
import loginAuthReducer from "./redux/slices/loginAuth/action";
import authenticationAPI from "./apis/login";
import dashboardAPI from "./apis/dashboard";

import formsAPI from "./apis/forms";
import reportsAPI from "./apis/reports";

export const store = configureStore({
  reducer: {
    [authenticationAPI.reducerPath]: authenticationAPI.reducer,

    [dashboardAPI.reducerPath]: dashboardAPI.reducer,
    [formsAPI.reducerPath]: formsAPI.reducer,

    [reportsAPI.reducerPath]: reportsAPI.reducer,

    componentState: componentStateReducer,

    loginAuthReducer: loginAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authenticationAPI.middleware,
      dashboardAPI.middleware,
      formsAPI.middleware,
      reportsAPI.middleware
    ),
});
