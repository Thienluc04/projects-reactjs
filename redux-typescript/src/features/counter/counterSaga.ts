import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, takeLatest, put, delay } from "@redux-saga/core/effects";
import { increment, incrementSaga, incrementSagaSuccess } from "./counterSlice";

// export function* log(action: PayloadAction) {
//   console.log("Log", action);
// }

function* hanldeIncrementSaga(action: PayloadAction<number>) {
  console.log("waiting 2s");

  yield delay(2000);

  console.log("waiting done, dispatch action");

  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
  console.log("counter saga");

  //   yield takeEvery(incrementSaga.toString(), hanldeIncrementSaga);
  yield takeLatest(incrementSaga.toString(), hanldeIncrementSaga);
}
