import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alertSlice";
import loginSlice from "./slices/loginSlice";
import userDataSlice from "./slices/userDataSlice";
import addOrEditStudentSlice from "./slices/addOrEditStudentSlice";
import { baseApi } from "./api/baseApi";
import addOrEditTeacherSlice from "./slices/addOrEditTeacherSlice";

const store = configureStore({
  reducer: {
    alert: alertSlice,
    login: loginSlice,
    userData: userDataSlice,
    addOrEditStudent: addOrEditStudentSlice,
    addOrEditTeacher: addOrEditTeacherSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware);
  }
});

export default store;