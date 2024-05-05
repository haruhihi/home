import { EOperator } from "@dtos/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";
import { TModel } from "../utils/db";

export const initOperatorModel = async (
  sequelize: Sequelize,
  syncOptions?: SyncOptions
) => {
  const Operator = sequelize.define(
    "Operator",
    {
      [EOperator.ID]: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
      },
      [EOperator.Name]: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
      initialAutoIncrement: "1000000",
    }
  );

  return Operator;
};
