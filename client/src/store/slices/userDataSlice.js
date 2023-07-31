import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: 'userData',
  initialState: { userType: null, data: null },
  reducers: {
    setUserData: (state, action) => {
      state.userType = action.payload.userType;
      state.data = action.payload.data;
    },
  }
});


export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;