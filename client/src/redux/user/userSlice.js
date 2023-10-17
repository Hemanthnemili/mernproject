import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curruntUser: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInState: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.curruntUser = action.payload;
      state.loading = false;
    },
    signInFailue: (state) => {
      state.loading = false;
    },
  },
});

export const { signInState, signInSuccess, signInFailue } = userSlice.actions;
export default userSlice.reducer;
