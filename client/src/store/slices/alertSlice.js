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
    showAlert: (state, action) => {
      return {
        ...state,
        ...action.payload,
        show: true,
      };
    },
    hideAlert: (state) => {
      return {
        ...state,
        show: false
      };
    }
  }
});


export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;