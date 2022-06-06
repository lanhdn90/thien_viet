
import { all } from 'redux-saga/effects';
import authSaga from '../features/Login/authSaga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
