import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: 'login',
  initialState: "admin",
  reducers: {
    setLogin: (state, action) => action.payload
  }
});


export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;