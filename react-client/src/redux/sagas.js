import { all } from "redux-saga/effects";
import projectsSagas from "./projects/saga";

export default function* rootSaga(getState) {
  yield all([
    projectsSagas(),
  ]);
}