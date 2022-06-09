import axiosClient from "./axiosClient";
import { Product, ListResponse } from "../models";
import { ListParams } from "./../models/common";

const urlApi = "/api/products";
export const ProductApi = {
  getAll(params: ListParams): Promise<ListResponse<Product>> {
    return axiosClient.get(urlApi, { params });
  },
  add(data: Product): Promise<Product> {
    return axiosClient.post(urlApi, data);
  },
  update(data: Partial<Product>): Promise<Product> {
    const url = `${urlApi}/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id: number): Promise<any> {
    const url = `${urlApi}/${id}`;
    return axiosClient.delete(url);
  },
};
