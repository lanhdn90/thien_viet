import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { authApi } from "../../api/authApi";
// import { authApi } from '../../api/authApi';
import { Account } from "../../models";
import { authActions } from "./authSlice";
function* handleLogin(action: PayloadAction<Account>) {
  try {
    // const res: LoginResponse = yield call(authApi.login,action.payload);
    // localStorage.setItem("access_token", "res.token");
    // localStorage.setItem("refresh_token", "res.refresh_token");
    // yield put(authActions.loginSuccess(res));
    // yield put(push("/Programs"));
    const res: Account = yield call(authApi.getAccountInfo);
    if (
      res.username === action.payload.username &&
      res.password === action.payload.password
    ) {
      localStorage.setItem("access_token", "res.token");
      localStorage.setItem("refresh_token", "res.refresh_token");
      yield put(
        authActions.loginSuccess({
          token: "string",
          refresh_token: "string",
        })
      );
      yield put(push("/Programs"));
    } else {
      yield put(authActions.loginFailed("Wrong Username or password"));
    }
  } catch (error: any) {
    yield put(authActions.loginFailed("Wrong Username or password"));
  }
}

function* handleLogout() {
  yield localStorage.clear();
  yield put(push("/"));
}

function* watchLoginFlow() {
  yield takeLatest(authActions.login.type, handleLogin);
  yield takeLatest(authActions.logout.type, handleLogout);
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
