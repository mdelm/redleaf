import { all } from "redux-saga/effects";
import projectSaga from "./project/saga";
import taskSaga from "./task/saga";
import authSaga from "./auth/saga";

export default function* rootSaga(getState) {
  yield all([
    projectSaga(),
    taskSaga(),
    authSaga()
  ]);
}