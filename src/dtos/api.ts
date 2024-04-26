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
