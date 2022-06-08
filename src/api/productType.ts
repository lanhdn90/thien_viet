import { ProductType } from '../models';
import { ListParams } from './../models/common';
import axiosClient from './axiosClient';

const urlApi = '/api/groups';
export const groupApi = {
    getAll(params: ListParams): Promise<ProductType[]>{
        return axiosClient.get(urlApi,{params})
    }
}