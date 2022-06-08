
import { all } from 'redux-saga/effects';
import authSaga from '../features/Login/authSaga';
import productSaga from '../features/Products/ProductSaga';

export default function* rootSaga() {
  yield all([authSaga(), productSaga()]);
}
