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
