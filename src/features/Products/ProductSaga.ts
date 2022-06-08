import { ProductApi } from "./../../api/productApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { productActions } from "./ProductSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import { ListParams, ListResponse, Product, ProductType } from "../../models";
import { groupApi } from "../../api/productType";

function* fetchProductList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Product> = yield call(
      ProductApi.getAll,
      action.payload
    );
    yield put(productActions.fetchProductListSuccess(response));
  } catch (error) {
    yield put(productActions.fetchProductListFailed());
  }
}
function* fetchProductTypeList(action: PayloadAction<ListParams>) {
  try {
    const response: ProductType[] = yield call(
      groupApi.getAll,
      action.payload
    );
    console.log('Log: ~ file: ProductSaga.ts ~ line 25 ~ function*fetchProductTypeList ~ response', response);
    yield put(productActions.fetchProductTypeListSuccess(response));
  } catch (error) {
    yield put(productActions.fetchProductListFailed());
  }
}

export default function* productSaga() {
  yield takeLatest(productActions.fetchProductList, fetchProductList);
  yield takeLatest(productActions.fetchProductTypeList, fetchProductTypeList);
}
