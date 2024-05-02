import { EPlan } from "./db";

enum ResNum {
  Success = 0,
  Fail = 10000,
}

export interface ILoginReq {
  username: string;
  password: string;
}

export const Res200 = <T>(params: {
  result?: T;
  message?: string;
  code?: number;
  success?: boolean;
}) => {
  return JSON.stringify({
    success: true,
    message: "",
    result: null,
    code: ResNum.Success,
    ...params,
  });
};

export const Res500 = <T>(params: {
  result?: T;
  message?: string;
  code?: number;
  success?: boolean;
}) => {
  return JSON.stringify({
    success: false,
    message: "",
    result: null,
    code: ResNum.Fail,
    ...params,
  });
};

export interface IRes<T = any> {
  success: boolean;
  message: string;
  result: T;
  code: ResNum;
}

export interface ISearchRes {
  // All count
  totalCount: number;
  // All pages
  totalPages: number;
  // data of this page
  data: any[];
}

export interface ISearchReq {
  // Page number
  page: number;
  // Page size
  pageSize: number;
}
export interface ISearchFilter extends ISearchReq {
  // [EPlan.Construction]?: string;
  // [EPlan.ConstructionDate]?: string;
  // [EPlan.ElectricLevel]?: string;
  // [EPlan.Place]?: string;
  // [EPlan.Section]?: string;
}

type TOptions = Array<{ label: string; value: string | number }>;

export interface IFormConfigRes {
  workOwnerOptions: TOptions;
  workerOptions: TOptions;
  maintainerOptions: TOptions;
  operatorOptions: TOptions;
}

export interface ICreateReq {
  [EPlan.WorkOwners.Name]: string[];
  [EPlan.Workers.Name]: string[];
  [EPlan.Maintainer.Name]: string;
  [EPlan.Operator.Name]: string[];
}
