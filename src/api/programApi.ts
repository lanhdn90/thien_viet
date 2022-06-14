import { Program } from "../models";
import { ListParams } from "../models/common";
import axiosClient from "./axiosClient";

const urlApi = "/api/programs";
export const programApi = {
  getAll(params: ListParams): Promise<Program[]> {
    return axiosClient.get(urlApi, { params });
  },
};
