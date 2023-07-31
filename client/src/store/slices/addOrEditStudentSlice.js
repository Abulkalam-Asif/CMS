import { createSlice } from "@reduxjs/toolkit";

const addOrEditStudentSlice = createSlice({
  name: 'AddOrEditStudent',
  initialState: "add",
  reducers: {
    setAddOrEditStudent: (state, action) => action.payload
  }
});


export const { setAddOrEditStudent } = addOrEditStudentSlice.actions;
export default addOrEditStudentSlice.reducer;