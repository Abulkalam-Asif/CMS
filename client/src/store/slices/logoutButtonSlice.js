import { createSlice } from "@reduxjs/toolkit";

const logoutButtonSlice = createSlice({
  name: 'logoutButton',
  initialState: false,
  reducers: {
    showLogoutButton: (state) => {
      return true;
    },
    hideLogoutButton: (state) => {
      return false;
    }
  }
});


export const { showLogoutButton, hideLogoutButton } = logoutButtonSlice.actions;
export default logoutButtonSlice.reducer;