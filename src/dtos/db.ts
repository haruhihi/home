export enum EPlan {
  ID = "ID",
  Place = "Place",
  Section = "Section",
  Construction = "Construction",
  ConstructionDate = "ConstructionDate",
  ElectricLevel = "ElectricLevel",
  /** 服务方案 */
  ServicePlan = "ServicePlan",
  /** 负荷停用 */
  LoadStop = "LoadStop",
}

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
