import { Program } from "../models";
import { ListParams } from "../models/common";
import axiosClient from "./axiosClient";

const urlApi = "/api/programs";
export const programApi = {
  getAll(params: ListParams): Promise<Program[]> {
    return axiosClient.get(urlApi, { params });
  },
  getProgramDetail(id: number): Promise<Program> {
    const url = `${urlApi}/${id}`;
    return axiosClient.get(url);
  },
};
