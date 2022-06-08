import axiosClient from './axiosClient';
import { Product, ListResponse } from '../models';
import { ListParams } from './../models/common';

const urlApi = '/api/products';
export const ProductApi = {
    getAll(params: ListParams): Promise<ListResponse<Product>>{
        return axiosClient.get(urlApi,{params})
    }
}