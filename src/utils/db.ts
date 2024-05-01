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
import { initUserModel } from "./model-user";
import { initPlanModel } from "./model-plan";

let cacheSequelize: Sequelize | null = null;
let cachePlan: ModelStatic<Model<any, any>> | null = null;
let cacheUser: ModelStatic<Model<any, any>> | null = null;

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
  console.log("Connection has been established successfully.");

  const Plan = initPlanModel(sequelize);
  await Plan.sync();
  cachePlan = Plan;

  const User = initUserModel(sequelize);
  await User.sync();
  cacheUser = User;

  cacheSequelize = sequelize;
  return { sequelize, Plan };
};
