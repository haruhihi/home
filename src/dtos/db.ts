export const EPlan = {
  /** 序号 */
  ID: {
    Name: "ID",
    label: "序号",
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
  /** 状态 */
  Status: {
    Name: "Status",
    label: "状态",
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

export const EPlanStatus = {
  /** 待审核 */
  Pending: {
    Name: "Pending",
    label: "待审核",
  },
  /** 审核通过 */
  Approved: {
    Name: "Approved",
    label: "审核通过",
  },
  /** 审核驳回 */
  Rejected: {
    Name: "Rejected",
    label: "审核不通过",
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
