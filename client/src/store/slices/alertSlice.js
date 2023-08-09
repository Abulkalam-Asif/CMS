import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    show: false,
    type: "success",
    message: "",
    seconds: 2500
  },
  reducers: {
    toggleAlert: (state, action) => {
      if (state.show) {
        return {
          ...state,
          show: false
        };
      } else {
        return {
          ...state,
          ...action.payload,
          show: true,
        };
      }
    }
  }
});


export const { toggleAlert } = alertSlice.actions;
export default alertSlice.reducer;