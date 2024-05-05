export const EPlan = {
  /** 序号 */
  ID: {
    Name: "ID",
    label: "序号",
  },
  /** 运维单位 */
  Maintainer: {
    Name: "Maintainer",
    label: "运维单位",
  },
  /** 施工单位 */
  Operator: {
    Name: "Operator",
    label: "施工单位",
  },
  /** 工作负责人 */
  WorkOwners: {
    Name: "WorkOwners",
    label: "工作负责人",
  },
  /** 施工人员 */
  Workers: {
    Name: "Workers",
    label: "施工人员",
  },
  /** 电压等级 */
  VoltageLevel: {
    Name: "VoltageLevel",
    label: "电压等级",
  },
  /** 特种作业人员 */
  SpecialWorkers: {
    Name: "SpecialWorkers",
    label: "特种作业人员",
  },
  /** 工作范围 */
  Section: {
    Name: "Section",
    label: "工作范围",
  },
  /** 专业分类 */
  Classification: {
    Name: "Classification",
    label: "专业分类",
  },
  /** 作业风险等级 */
  WorkRiskLevel: {
    Name: "WorkRiskLevel",
    label: "作业风险等级",
  },
  /** 电网风险等级 */
  ElectricRiskLevel: {
    Name: "ElectricRiskLevel",
    label: "电网风险等级",
  },
  /** 作业内容 */
  WorkContent: {
    Name: "WorkContent",
    label: "作业内容",
  },
  /** 带电作业 */
  WithElectric: {
    Name: "WithElectric",
    label: "带电作业",
  },
  /** 带电作业开始时间 */
  WithElectricWorkStartAt: {
    Name: "WithElectricWorkStartAt",
    label: "带电作业开始时间",
  },
  /** 带电作业任务 */
  WithElectricWorkText: {
    Name: "WithElectricWorkText",
    label: "带电作业任务（文）",
  },
  /** 带电作业任务图片 */
  WithElectricWorkImgs: {
    Name: "WithElectricWorkImgs",
    label: "带电作业任务（图）",
  },
  /** 是否停电 */
  PowerCut: {
    Name: "PowerCut",
    label: "是否停电",
  },
  /** 甲方履责及现场验收（文） */
  VerificationText: {
    Name: "VerificationText",
    label: "甲方履责及现场验收（文）",
  },
  /** 甲方履责及现场验收（图） */
  VerificationImgs: {
    Name: "VerificationImgs",
    label: "甲方履责及现场验收（图）",
  },
  /** 现勘、施工方案、工作票 */
  Overview: {
    Name: "Overview",
    label: "现勘、施工方案、工作票",
  },
  /** 施工附图、鸟瞰图 */
  BirdsEye: {
    Name: "BirdsEye",
    label: "施工附图、鸟瞰图",
  },
  /** 高风险作业点（文） */
  HighRiskPlaceText: {
    Name: "HighRiskPlaceText",
    label: "高风险作业点（文）",
  },
  /** 高风险作业点（图） */
  HighRiskPlaceImgs: {
    Name: "HighRiskPlaceImgs",
    label: "高风险作业点（图）",
  },
  /** 负荷停用 */
  LoadStop: {
    Name: "LoadStop",
    label: "负荷停用",
  },
  /** 负荷转供 */
  LoadShifting: {
    Name: "LoadShifting",
    label: "负荷转供",
  },
  /** 设备是否满足条件 */
  EquipmentCondition: {
    Name: "EquipmentCondition",
    label: "设备是否满足条件",
  },
  /** 操巡队开关是否到位 */
  PatrolSwitch: {
    Name: "PatrolSwitch",
    label: "操巡队开关是否到位",
  },
  /** 停电方式及区域 */
  PowerOutMethod: {
    Name: "PowerOutMethod",
    label: "停电方式及区域",
  },
  /** 停电范围 */
  PowerOutPlace: {
    Name: "PowerOutPlace",
    label: "停电范围",
  },
  /** 计划开工时间 */
  ExpectStartAt: {
    Name: "ExpectStartAt",
    label: "计划开工时间",
  },
  /** 计划完工时间 */
  ExpectFinishAt: {
    Name: "ExpectFinishAt",
    label: "计划完工时间",
  },
  /** 负荷停用时间 */
  LoadStopAt: {
    Name: "LoadStopAt",
    label: "负荷停用时间",
  },

  /** 计划来源（文） */
  PlanSourceText: {
    Name: "PlanSourceText",
    label: "计划来源（文）",
  },
  /** 计划来源（图） */
  PlanSourceImgs: {
    Name: "PlanSourceImgs",
    label: "计划来源（图）",
  },
  /** 一停多用情况（文） */
  OneStopMultiUseText: {
    Name: "OneStopMultiUseText",
    label: "一停多用情况（文）",
  },
  /** 一停多用情况（图） */
  OneStopMultiUseImgs: {
    Name: "OneStopMultiUseImgs",
    label: "一停多用情况（图）",
  },
  /** 指标提升情况（文） */
  MetricsImprovementText: {
    Name: "MetricsImprovementText",
    label: "指标提升情况（文）",
  },
  /** 指标提升情况（图） */
  MetricsImprovementImgs: {
    Name: "MetricsImprovementImgs",
    label: "指标提升情况（图）",
  },
  /** 停电时户数（文） */
  PowerOutageHomesText: {
    Name: "PowerOutageHomesText",
    label: "停电时户数（文）",
  },
  /** 停电时户数（图） */
  PowerOutageHomesImgs: {
    Name: "PowerOutageHomesImgs",
    label: "停电时户数（图）",
  },
  /** 服务方案 */
  ServicePlan: {
    Name: "ServicePlan",
    label: "服务方案",
  },
  /** 服务方案内容 */
  ServicePlanContent: {
    Name: "ServicePlanContent",
    label: "服务方案内容",
  },
  /** 设备异动单 */
  EquipmentAllocation: {
    Name: "EquipmentAllocation",
    label: "设备异动单",
  },
  /** 设备异动单编号 */
  EquipmentAllocationId: {
    Name: "EquipmentAllocationId",
    label: "设备异动单编号",
  },
  /** 物资调拨单 */
  MaterialAllocation: {
    Name: "MaterialAllocation",
    label: "物资调拨单",
  },
  /** 现场作业组织 */
  OnSiteWork: {
    Name: "OnSiteWork",
    label: "现场作业组织",
  },
  /** 审核评论 */
  AuditComment: {
    Name: "AuditComment",
    label: "审核评论",
  },
  /** 审核状态 */
  Status: {
    Name: "Status",
    label: "审核状态",
  },
  /** 创建时间 - Sequelize 自动 */
  CreatedAt: {
    Name: "createdAt",
    label: "创建时间",
  },
  /** 更新时间 - Sequelize 自动 */
  UpdatedAt: {
    Name: "updatedAt",
    label: "更新时间",
  },
} as const;

export enum EPlanStatusEnum {
  /** 待审核 */
  Pending = "Pending",
  /** 审核通过 */
  Approved = "Approved",
  /** 审核驳回 */
  Rejected = "Rejected",
}

export const EPlanStatus = {
  /** 待审核 */
  [EPlanStatusEnum.Pending]: {
    Name: "Pending",
    label: "待审核",
  },
  /** 审核通过 */
  [EPlanStatusEnum.Approved]: {
    Name: "Approved",
    label: "已批准",
  },
  /** 审核驳回 */
  [EPlanStatusEnum.Rejected]: {
    Name: "Rejected",
    label: "已驳回",
  },
} as const;

export enum EUser {
  ID = "ID",
  /** 账户名 */
  Account = "Account",
  /** 密码 */
  Password = "Password",
  /** 姓名 */
  Name = "Name",
  /** 是否是工作负责人 */
  IsWorkOwner = "IsWorkOwner",
  /** 是否是施工人员 */
  IsWorker = "IsWorker",
  /** 是否是特种作业人员 */
  IsSpecialWorker = "IsSpecialWorker",
  /** 角色 */
  Role = "Role",
}

export enum EUserRoleEnum {
  /** 管理员 */
  Admin = "Admin",
  /** 用户 */
  User = "User",
}

export const EUserRole = {
  /** 管理员 */
  Admin: {
    Name: EUserRoleEnum.Admin,
    label: "管理员",
  },
  /** 用户 */
  User: {
    Name: EUserRoleEnum.User,
    label: "用户",
  },
} as const;

/** 运维单位 */
export enum EMaintainer {
  /** ID */
  ID = "ID",
  /** 姓名 */
  Name = "Name",
}

/** 施工单位 */
export enum EOperator {
  /** ID */
  ID = "ID",
  /** 姓名 */
  Name = "Name",
}

/** 台区 */
export enum ESection {
  /** ID */
  ID = "ID",
  /** 姓名 */
  Name = "Name",
}

/** 计划 - 台区 */
export enum EPlanSection {
  /** PlanId */
  PlanId = "PlanId",
  /** SectionId */
  SectionId = "SectionId",
}

/** 人民 */
export enum EPerson {
  /** ID */
  ID = "ID",
  /** 姓名 */
  Name = "Name",
  /** 电话 */
  PhoneNum = "PhoneNum",
  /** 风险点 */
  Risk = "Risk",
  /** 台区 id */
  SectionId = "SectionId",
}

export const EPersonData = {
  Name: {
    Name: EPerson.Name,
    Label: "姓名",
  },
  PhoneNum: {
    Name: EPerson.PhoneNum,
    Label: "联系方式",
  },
  Risk: {
    Name: EPerson.Risk,
    Label: "风险点",
  },
  SectionId: {
    Name: EPerson.SectionId,
    Label: "所属台区",
  },
};
