import { createSlice } from "@reduxjs/toolkit";

const addOrEditCourseSlice = createSlice({
  name: 'AddOrEditCourse',
  initialState: "add",
  reducers: {
    setAddOrEditCourse: (state, action) => action.payload
  }
});


export const { setAddOrEditCourse } = addOrEditCourseSlice.actions;
export default addOrEditCourseSlice.reducer;