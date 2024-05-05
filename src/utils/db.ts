import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "@constants/config";
import { Model, ModelStatic, Options, Sequelize, SyncOptions } from "sequelize";
import mysql2 from "mysql2";
import { user } from "@models/user";
import { initPlanModel } from "@models/plan";
import { initMaintainerModel } from "@models/maintainer";
import { initOperatorModel } from "@models/operator";
import { section } from "@models/section";
import * as people from "@models/person";

let cache: {
  sequelize: Sequelize;
  Plan: TModel;
  User: TModel;
  Maintainer: TModel;
  Operator: TModel;
  Section: TModel;
  Person: TModel;
} | null = null;

export type TModel = ModelStatic<Model<any, any>>;

export const getModels = async (
  configs: { dangerousDropAllTables?: boolean } = {}
) => {
  const { dangerousDropAllTables = false } = configs;
  // should skip cache, when you want to drop and rebuild all tables
  if (cache && !dangerousDropAllTables) return cache;
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

  const User = await user.define(sequelize);

  const Maintainer = await initMaintainerModel(sequelize);

  const Operator = await initOperatorModel(sequelize);

  const Plan = await initPlanModel(sequelize);

  const Section = await section.define(sequelize);

  const Person = await people.initModel(sequelize);

  if (dangerousDropAllTables) {
    await sequelize.drop();
    console.warn("----------drop all tables!!!-----------");
  }

  await sequelize.sync();

  cache = {
    sequelize,
    Plan,
    User,
    Maintainer,
    Operator,
    Section,
    Person,
  };
  return cache;
};
