export interface Program {
  key?: number;
  id?: number;
  label: string;
  startDate?: number;
  endDate?: number;
  content: {
    [key: string]: ContentChild;
  };
}

export interface ContentChild {
  brands: number[];
  amount: number[];
}
