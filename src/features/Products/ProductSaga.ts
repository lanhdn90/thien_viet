import { ProductApi } from "./../../api/productApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { productActions } from "./ProductSlice";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import {
  ListParams,
  ListResponse,
  Product,
  ProductType,
  Program,
} from "../../models";
import { groupApi } from "../../api/productType";
import { programApi } from "../../api/programApi";

function* fetchProgramDetail(action: PayloadAction<number>) {
  try {
    const response: Program = yield call(
      programApi.getProgramDetail,
      action.payload
    );
    yield put(
      productActions.fetchProgramDetailSuccess(Object.keys(response.content))
    );
  } catch (error) {
    yield put(productActions.fetchProductListFailed());
  }
}
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
    const response: ProductType[] = yield call(groupApi.getAll, action.payload);
    yield put(productActions.fetchProductTypeListSuccess(response));
  } catch (error) {
    yield put(productActions.fetchProductListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(productActions.setFilter(action.payload));
}

export default function* productSaga() {
  yield takeLatest(productActions.fetchProgramDetail, fetchProgramDetail);
  yield takeLatest(productActions.fetchProductList, fetchProductList);
  yield takeLatest(productActions.fetchProductTypeList, fetchProductTypeList);
  yield debounce(
    500,
    productActions.setFilterWithDebounce.type,
    handleSearchDebounce
  );
}
