export interface Store {
  key?: number;
  id?: number;
  name: string;
  address: string;
  phone: string;
  typeOfDisplay: string;
  employee: string;
  result: number;
  registrationDate: number;
  programsId: number;
  images: string[];
}
export interface StoreReport {
  Id: number;
  Name: string;
  Address: string;
  Phone: string;
  Program: string;
  Option: string;
  Employee: string;
  Result: string;
  Registration_Date: string;
}

export interface objectWidths {
  width: number;
}
