import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: 'userData',
  initialState: { userType: null, data: null },
  reducers: {
    setUserData: (state, action) => {
      state.userType = action.payload.userType;
      state.data = action.payload.data;
    },
    clearUserData: (state) => {
      state.userType = null;
      state.data = null;
    }
  }
});


export const { setUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;