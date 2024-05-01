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
import { initMaintainer, initMaintainerModel } from "./model-maintainer";
import { initOperator, initOperatorModel } from "./model-operator";

let cache: {
  sequelize: Sequelize;
  Plan: TModel;
  User: TModel;
  Maintainer: TModel;
  Operator: TModel;
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

  const Plan = await initPlanModel(sequelize);
  // const Plan = await initPlanModel(sequelize, { force: true });

  const User = await initUserModel(sequelize);
  // const User = await initUserModel(sequelize, { force: true });

  const Maintainer = await initMaintainerModel(sequelize);
  // const Maintainer = await initMaintainerModel(sequelize, { force: true });

  const Operator = await initOperatorModel(sequelize);
  // const Operator = await initOperatorModel(sequelize, { force: true });

  cache = {
    sequelize,
    Plan,
    User,
    Maintainer,
    Operator,
  };
  return cache;
};
