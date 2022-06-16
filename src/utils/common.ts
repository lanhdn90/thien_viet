import { Product, ProductType, Program, Store, StoreReport } from "../models";
import moment from "moment";
export const convertDataProduct = (array: Product[]): Product[] => {
  let newArray: Product[] = [];
  array.forEach((item) => {
    newArray = [
      ...newArray,
      { ...item, key: item.id, employee: "Nguyễn Thị Hằng" },
    ];
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
export const convertDataResult = (value: number): string => {
  let res = value === 1 ? "Achieved" : value === 0 ? "Not achieved" : "Expired";
  return res;
};

export const convertDataReport = (
  arrayStore: Store[],
  arrayProgram: Program[]
): StoreReport[] => {
  let newArray: StoreReport[] = [];
  arrayStore.forEach((item: Store, index: number) => {
    let newObject: StoreReport = {
      Id: index + 1,
      Name: item.name,
      Address: item.address,
      Phone: item.phone,
      Program: convertProgramsType(item.programsId, arrayProgram),
      Option: item.typeOfDisplay,
      Employee: item.employee,
      Registration_Date: moment(item.registrationDate).format("YYYY-MM-DD"),
      Result: convertDataResult(item.result),
    };
    newArray = [...newArray, newObject];
  });
  return newArray;
};
