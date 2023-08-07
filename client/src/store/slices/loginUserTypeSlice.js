import { createSlice } from "@reduxjs/toolkit";

const loginUserTypeSlice = createSlice({
  name: 'loginUserType',
  initialState: "admin",
  reducers: {
    setLoginUserType: (state, action) => action.payload
  }
});


export const { setLoginUserType } = loginUserTypeSlice.actions;
export default loginUserTypeSlice.reducer;