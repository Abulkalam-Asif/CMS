import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alertSlice";
import loginSlice from "./slices/loginSlice";
import userDataSlice from "./slices/userDataSlice";
import { baseApi } from "./api/baseApi";

const store = configureStore({
  reducer: {
    alert: alertSlice,
    login: loginSlice,
    userData: userDataSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware);
  }
});

export default store;