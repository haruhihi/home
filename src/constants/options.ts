export const voltageLevelOptions = ["35kV", "10kV", "0.38kV", "0.22kV"];

export enum WithElectricOptionEnum {
  Yes = "需要",
  No = "不需要",
}
export const WithElectricOptions = [
  WithElectricOptionEnum.Yes,
  WithElectricOptionEnum.No,
];

export enum PowerCutOptionEnum {
  Yes = "是",
  No = "否",
}
export const PowerCutOptions = [PowerCutOptionEnum.Yes, PowerCutOptionEnum.No];

export enum LoadShiftingOptionEnum {
  Yes = "是",
  No = "否",
}

export const LoadShiftingOptions = [
  LoadShiftingOptionEnum.Yes,
  LoadShiftingOptionEnum.No,
];

export enum PatrolSwitchEnum {
  Yes = "是",
  No = "否",
}

export const PatrolSwitchOptions = [PatrolSwitchEnum.Yes, PatrolSwitchEnum.No];

export enum PowerOutMethodEnum {
  CutOff = "停用开关",
  WithElectric = "带电作业",
}

export const PowerOutMethodOptions = [
  PowerOutMethodEnum.CutOff,
  PowerOutMethodEnum.WithElectric,
];

export const specificAreaOptions = ["配电", "营销", "设备", "产业"];

export const riskLevelOptions = ["一级", "二级", "三级", "四级", "五级"];

export const electricRiskLevelOptions = [
  "四级",
  "五级",
  "六级",
  "七级",
  "八级",
];
