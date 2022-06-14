import { Account, ListParams } from '../models';
import axiosClient from './axiosClient';

const urlApi = '/api';
export const authApi = {
  login(params: Account): Promise<Account> {
    const url = `${urlApi}/login`;
    return axiosClient.post(url, params);
  },
  // getUserInfo(): Promise<UserInfo> {
  //   const url = `${urlApi}/user`;
  //   return axiosClient.get(url);
  // },
  getAccountInfo(params: ListParams): Promise<Account[]> {
    const url = `${urlApi}/user`;
    return axiosClient.get(url,{params});
  },
};
