import counterSaga from "features/counter/counterSaga";
import dashboardSaga from "features/dashboard/dashboardSaga";
import { all } from "redux-saga/effects";
import { authSaga } from "features/auth/authSaga";
import studentSaga from "features/students/studentSaga";
import citySaga from "features/city/citySaga";

export default function* rootSaga() {
  yield all([counterSaga(), authSaga(), dashboardSaga(), studentSaga(), citySaga()]);
}
