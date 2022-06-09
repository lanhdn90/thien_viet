import { RootState } from "./../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, PaginationParams, ProductType } from "../../models";
import { ListParams, ListResponse } from "./../../models/common";
import { convertDataProduct } from "../../utils/common";
export interface ProductState {
  loading: boolean;
  list: Product[];
  filter: ListParams;
  pagination: PaginationParams;
  productType: ProductType[];
}

const initialState: ProductState = {
  loading: false,
  list: [],
  productType: [],
  filter: {
    _page: 1,
    _limit: 10,
  },
  pagination: {
    _page: 1,
    _limit: 10,
    totalElement: 15,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductTypeList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchProductTypeListSuccess(state, action: PayloadAction<ProductType[]>) {
      state.productType = action.payload;
      state.loading = false;
    },

    fetchProductList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchProductListSuccess(
      state,
      action: PayloadAction<ListResponse<Product>>
    ) {
      state.list = convertDataProduct(action.payload.data);
      state.loading = false;
      state.pagination = action.payload.pagination;
    },
    fetchProductListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

export const productActions = productSlice.actions;

export const selectProductList = (state: RootState) => state.product.list;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductFilter = (state: RootState) => state.product.filter;
export const selectProductPagination = (state: RootState) =>
  state.product.pagination;
export const selectProductType = (state: RootState) =>
  state.product.productType;

const productReducer = productSlice.reducer;
export default productReducer;
