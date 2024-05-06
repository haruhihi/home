import {
  EPlan,
  EUser,
  EPlanStatus,
  EUserRoleEnum,
  EPlanStatusEnum,
} from "./db";

enum ResNum {
  Success = 0,
  Fail = 10000,
}

export interface ILoginReq {
  [EUser.Account]: string;
  [EUser.Password]: string;
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

export type TOptions = Array<{ label: string; value: string | number }>;

export interface IFormConfigRes {
  workOwnerOptions: TOptions;
  workerOptions: TOptions;
  specialWorkerOptions: TOptions;
  maintainerOptions: TOptions;
  operatorOptions: TOptions;
}

export interface ICreateReq {
  [EPlan.WorkOwners.Name]: string[];
  [EPlan.Workers.Name]: string[];
  [EPlan.Maintainer.Name]: string;
  [EPlan.Operator.Name]: string[];
  [EPlan.VoltageLevel.Name]: string;
  [EPlan.SpecialWorkers.Name]: string[];
  [EPlan.Section.Name]: string[];
  [EPlan.Classification.Name]: string;
  [EPlan.WorkRiskLevel.Name]: string;
  [EPlan.ElectricRiskLevel.Name]: string;
  [EPlan.WorkContent.Name]: string;
  [EPlan.WithElectric.Name]: string;
  [EPlan.WithElectricWorkText.Name]: string;
  [EPlan.WithElectricWorkImgs.Name]: string[];
  [EPlan.PowerCut.Name]: string;
  [EPlan.VerificationText.Name]: string;
  [EPlan.VerificationImgs.Name]: string[];
  [EPlan.Overview.Name]: string[];
  [EPlan.BirdsEye.Name]: string[];
  [EPlan.HighRiskPlaceText.Name]: string;
  [EPlan.HighRiskPlaceImgs.Name]: string[];
  [EPlan.LoadStop.Name]: string;
  [EPlan.LoadShifting.Name]: string;
  [EPlan.EquipmentCondition.Name]: string;
  [EPlan.PatrolSwitch.Name]: string[];
  [EPlan.PowerOutMethod.Name]: string[];
  [EPlan.PowerOutPlace.Name]: string;
  [EPlan.ExpectStartAt.Name]: string;
  [EPlan.ExpectFinishAt.Name]: string;
  [EPlan.LoadStopAt.Name]: string;
  [EPlan.WithElectricWorkTimeRange.Name]: [string, string];
  [EPlan.WithElectricWorkTimeRange2.Name]: [string, string];
  [EPlan.PlanSourceText.Name]: string;
  [EPlan.PlanSourceImgs.Name]: string[];
  [EPlan.OneStopMultiUseText.Name]: string;
  [EPlan.OneStopMultiUseImgs.Name]: string[];
  [EPlan.MetricsImprovementText.Name]: string;
  [EPlan.MetricsImprovementImgs.Name]: string[];
  [EPlan.PowerOutageHomesText.Name]: string;
  [EPlan.PowerOutageHomesImgs.Name]: string[];
  [EPlan.ServicePlan.Name]: string[];
  [EPlan.ServicePlanContent.Name]: string;
  [EPlan.EquipmentAllocation.Name]: string[];
  [EPlan.EquipmentAllocationId.Name]: string;
  [EPlan.MaterialAllocation.Name]: string[];
  [EPlan.OnSiteWork.Name]: string;
}

export interface IAccountInfoRes {
  [EUser.Account]: string;
  [EUser.Role]: EUserRoleEnum;
}

export interface IPlanDetailRes {
  plan: any;
  people: any[];
  sections: any[];
}

export interface IAuditReq {
  [EPlan.Status.Name]: EPlanStatusEnum;
  [EPlan.ID.Name]: string;
  [EPlan.AuditComment.Name]: string;
}
