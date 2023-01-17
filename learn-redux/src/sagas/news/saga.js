import { takeLatest } from "redux-saga/effects";
import handleGetNews from "./handles";
import { getNews } from "./newsSlice";

export default function* newsSaga() {
  yield takeLatest(getNews.type, handleGetNews);
}
