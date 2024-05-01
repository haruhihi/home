import { EPlan } from "@dtos/db";
import { DataTypes, Sequelize } from "sequelize";

export const initPlanModel = (sequelize: Sequelize) => {
  const Plan = sequelize.define(
    "Plan",
    {
      [EPlan.ID]: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      // 供电所
      [EPlan.Place]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // 台区
      [EPlan.Section]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // 施工单位
      [EPlan.Construction]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // 时间
      [EPlan.ConstructionDate]: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // 电压等级
      [EPlan.ElectricLevel]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // 计划必要性 - 计划来源
      necessityBackground: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 计划必要性 - 一停多用
      necessityMulti: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 计划必要性 - 指标提升情况
      necessityResult: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 计划必要性 - 负荷停用
      cautionCutOff: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 计划必要性 - 带电作业
      cautionElectric: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 计划必要性 - 开工后过程督办
      cautionSupervision: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // Other model options go here
    }
  );
  return Plan;
};
