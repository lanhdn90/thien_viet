import { Product, ProductType, Program } from "../models";

export const convertDataProduct = (array: Product[]): Product[] => {
  let newArray: Product[] = [];
  array.forEach((item) => {
    newArray = [...newArray, { ...item, key: item.id, employee: "Nguyễn Thị Hằng" }];
  });
  return newArray;
};

export const convertProductType = (
  value: number,
  array: ProductType[]
): string => {
  let res = array.find((item) => item.id === value);
  return res ? res.label : "";
};
export const convertProgramsType = (
  value: number,
  array: Program[]
): string => {
  let res = array.find((item) => item.id === value);
  return res ? res.label : "";
};
