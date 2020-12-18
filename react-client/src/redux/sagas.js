import { all } from "redux-saga/effects";
import projectSaga from "./project/saga";
import taskSaga from "./task/saga";

export default function* rootSaga(getState) {
  yield all([
    projectSaga(),
    taskSaga()
  ]);
}