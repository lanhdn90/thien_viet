import { Account, UserInfo } from '../models';
import axiosClient from './axiosClient';

const urlApi = '/api/v1/auth';
export const authApi = {
  login(params: Account): Promise<Account> {
    const url = `${urlApi}/login`;
    return axiosClient.post(url, params);
  },
  getUserInfo(): Promise<UserInfo> {
    const url = `${urlApi}/user`;
    return axiosClient.get(url);
  },
};
