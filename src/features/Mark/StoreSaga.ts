import { PayloadAction } from "@reduxjs/toolkit";
// import { productActions } from "./StoreSlice";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { programApi } from "../../api/programApi";
import { storeApi } from "../../api/storeApi";
import { ListParams, ListResponse, Program, Store } from "../../models";
import { storeActions } from "./StoreSlice";

function* fetchStoreList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Store> = yield call(
      storeApi.getAll,
      action.payload
    );
    yield put(storeActions.fetchStoreListSuccess(response));
  } catch (error) {
    yield put(storeActions.fetchStoreListFailed());
  }
}
function* fetchStoreMarkList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Store> = yield call(
      storeApi.getStoreMark,
      action.payload
    );
    yield put(storeActions.fetchStoreListSuccess(response));
  } catch (error) {
    yield put(storeActions.fetchStoreListFailed());
  }
}
function* fetchPrograms(action: PayloadAction<ListParams>) {
  try {
    const response: Program[] = yield call(programApi.getAll, action.payload);
    yield put(storeActions.fetchProgramsSuccess(response));
  } catch (error) {
    yield put(storeActions.fetchStoreListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(storeActions.setFilterReport(action.payload));
}
function* handleSearchMarkDebounce(action: PayloadAction<ListParams>) {
  yield put(storeActions.setFilter(action.payload));
}

export default function* storeSaga() {
  yield takeLatest(storeActions.fetchStoreMarkList, fetchStoreMarkList);
  yield takeLatest(storeActions.fetchStoreList, fetchStoreList);
  yield takeLatest(storeActions.fetchPrograms, fetchPrograms);
  yield debounce(
    500,
    storeActions.setFilterWithDebounce.type,
    handleSearchDebounce
  );
  yield debounce(
    500,
    storeActions.setFilterMarkWithDebounce.type,
    handleSearchMarkDebounce
  );
}
