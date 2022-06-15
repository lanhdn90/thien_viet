import { ListResponse, Store } from "../models";
import { ListParams } from "../models/common";
import axiosClient from "./axiosClient";

const urlApi = "/api/stores";
export const storeApi = {
  getAll(params: ListParams): Promise<ListResponse<Store>> {
    return axiosClient.get(urlApi, { params });
  },
  getStoreMark(params: ListParams): Promise<ListResponse<Store>> {
    let url = `${urlApi}?review=true`;
    return axiosClient.get(url, { params });
  },
  update(data: Partial<Store>): Promise<Store> {
    const url = `${urlApi}/${data.id}`;
    return axiosClient.patch(url, data);
  },
};
