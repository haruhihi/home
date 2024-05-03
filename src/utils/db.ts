import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "@constants/config";
import { Model, ModelStatic, Options, Sequelize } from "sequelize";
import mysql2 from "mysql2";
import { initUserModel } from "./model-user";
import { initPlanModel } from "./model-plan";
import { initMaintainerModel } from "./model-maintainer";
import { initOperatorModel } from "./model-operator";
import * as sections from "@models/sections";

let cache: {
  sequelize: Sequelize;
  Plan: TModel;
  User: TModel;
  Maintainer: TModel;
  Operator: TModel;
  Section: TModel;
} | null = null;

export type TModel = ModelStatic<Model<any, any>>;

export const getModels = async () => {
  if (cache) return cache;
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

  const User = await initUserModel(sequelize);

  const Maintainer = await initMaintainerModel(sequelize);

  const Operator = await initOperatorModel(sequelize);

  const Plan = await initPlanModel(sequelize);

  const Section = await sections.initModel(sequelize);

  cache = {
    sequelize,
    Plan,
    User,
    Maintainer,
    Operator,
    Section,
  };
  return cache;
};
