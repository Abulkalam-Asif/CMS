import { createSlice } from "@reduxjs/toolkit";

const addOrEditTeacherSlice = createSlice({
  name: 'AddOrEditTeacher',
  initialState: "add",
  reducers: {
    setAddOrEditTeacher: (state, action) => action.payload
  }
});


export const { setAddOrEditTeacher } = addOrEditTeacherSlice.actions;
export default addOrEditTeacherSlice.reducer;