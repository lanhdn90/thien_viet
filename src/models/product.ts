import { UploadFile } from "antd/es/upload/interface";

export interface Product {
  key?: number;
  id?: number;
  name: string;
  groupId: number;
  image: string;
  imagesTraining?: string[];
  createdAt?: number;
  employee?: string;
  listFile?: UploadFile[];
}
export interface ProductType {
  id: number;
  label: string;
  labelId: number;
}
