import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alertSlice";
import loginUserTypeSlice from "./slices/loginUserTypeSlice";
import userDataSlice from "./slices/userDataSlice";
import addOrEditStudentSlice from "./slices/addOrEditStudentSlice";
import { baseApi } from "./api/baseApi";
import addOrEditTeacherSlice from "./slices/addOrEditTeacherSlice";
import addOrEditCourseSlice from "./slices/addOrEditCourseSlice";
import logoutButtonSlice from "./slices/logoutButtonSlice";

const store = configureStore({
  reducer: {
    alert: alertSlice,
    loginUserType: loginUserTypeSlice,
    logoutButton: logoutButtonSlice,
    userData: userDataSlice,
    addOrEditStudent: addOrEditStudentSlice,
    addOrEditTeacher: addOrEditTeacherSlice,
    addOrEditCourse: addOrEditCourseSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware);
  }
});

export default store;