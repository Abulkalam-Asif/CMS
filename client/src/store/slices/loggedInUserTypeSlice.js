import { createSlice } from "@reduxjs/toolkit";

const loggedInUserTypeSlice = createSlice({
  name: 'loggedInUserType',
  initialState: "admin",
  reducers: {
    setLoggedInUserType: (state, action) => action.payload
  }
});


export const { setLoggedInUserType } = loggedInUserTypeSlice.actions;
export default loggedInUserTypeSlice.reducer;