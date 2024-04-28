import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  SessionSecret,
} from "@constants/config";
import { DataTypes, Model, ModelStatic, Options, Sequelize } from "sequelize";
import mysql2 from "mysql2";
import { EPlan } from "@dtos/db";

let cacheSequelize: Sequelize | null = null;
let cachePlan: ModelStatic<Model<any, any>> | null = null;

export const getModels = async () => {
  if (cachePlan && cacheSequelize) {
    return { Plan: cachePlan, sequelize: cacheSequelize };
  }
  // First time
  const params: Options = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    dialect: "mysql",
    dialectModule: mysql2,
  };
  const sequelize = new Sequelize(params);

  await sequelize.authenticate();
  // cacheSequelize = sequelize;
  const Plan = sequelize.define(
    "Plan",
    {
      [EPlan.ID]: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
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
  await Plan.sync();
  cachePlan = Plan;
  cacheSequelize = sequelize;
  return { sequelize, Plan };
};
