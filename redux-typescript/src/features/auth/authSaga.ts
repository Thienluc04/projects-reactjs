import { delay } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, fork, put, take } from "redux-saga/effects";
import { LoginPayload, authActions } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
  try {
    console.log("hanlde login", payload);
    yield delay(1000);
    localStorage.setItem("access_token", "fake_token");
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: "Thienluc",
      })
    );
    yield put(push("/admin/dashboard"));
  } catch (error) {
    yield put(authActions.loginFailed("Login failed"));
  }
}

function* handleLogout() {
  console.log("handle logout");
  localStorage.removeItem("access_token");
  yield put(push("/login"));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
