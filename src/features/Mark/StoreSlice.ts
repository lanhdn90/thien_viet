import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationParams, Program, Store } from "../../models";
import { RootState } from "../../app/store";
import { ListParams, ListResponse } from "../../models/common";
export interface StoreState {
  loading: boolean;
  list: Store[];
  filter: ListParams;
  filterReport: ListParams;
  pagination?: PaginationParams;
  programs: Program[];
}

const initialState: StoreState = {
  loading: false,
  list: [],
  programs: [],
  filter: {
    _page: 1,
    _limit: 10,
  },
  filterReport: {
    _page: 1,
    _limit: 10,
  },
  pagination: undefined,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    fetchPrograms(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchProgramsSuccess(state, action: PayloadAction<Program[]>) {
      // state.list = convertDataProduct(action.payload.data);
      state.programs = action.payload;
      state.loading = false;
    },
    fetchStoreList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
      state.pagination = undefined;
      state.list = [];
    },
    fetchStoreMarkList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
      state.pagination = undefined;
      state.list = [];
    },
    fetchStoreListSuccess(state, action: PayloadAction<ListResponse<Store>>) {
      state.list = action.payload.data;
      state.loading = false;
      state.pagination = action.payload.pagination;
    },
    fetchStoreListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterReport(state, action: PayloadAction<ListParams>) {
      state.filterReport = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    setFilterMarkWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

export const storeActions = storeSlice.actions;

export const selectStoreList = (state: RootState) => state.stores.list;
export const selectStoreLoading = (state: RootState) => state.stores.loading;
export const selectStoreFilter = (state: RootState) => state.stores.filter;
export const selectStoreFilterReport = (state: RootState) =>
  state.stores.filterReport;
export const selectStorePagination = (state: RootState) =>
  state.stores.pagination;
export const selectPrograms = (state: RootState) => state.stores.programs;

const storeReducer = storeSlice.reducer;
export default storeReducer;
