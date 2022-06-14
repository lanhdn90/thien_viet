import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account, ListParams } from "../../models";

export interface AuthState {
  isLoggedIn?: boolean;
  logging?: boolean;
  error?: string;
  userInfo?: Account;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  error: undefined,
  userInfo: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<ListParams>) {
      state.logging = true;
      state.error = "";
    },
    loginSuccess(state, action: PayloadAction<Account>) {
      state.userInfo = action.payload;
      state.logging = false;
      state.isLoggedIn = true;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
      state.error = action.payload;
    },
    logout(state) {
      state.logging = false;
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLogging = (state: any) => state.auth.logging;
export const selectError = (state: any) => state.auth.error;
export const selectUserInfo = (state: any) => state.auth.userInfo;

const authReducer = authSlice.reducer;
export default authReducer;
