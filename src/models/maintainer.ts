import { EMaintainer, EPlan, EUser } from "@dtos/db";
import {
  DataTypes,
  Model,
  ModelStatic,
  Sequelize,
  SyncOptions,
} from "sequelize";
import { TModel } from "../utils/db";

export const initMaintainerModel = async (
  sequelize: Sequelize,
  syncOptions?: SyncOptions
) => {
  const Maintainer = sequelize.define(
    "Maintainer",
    {
      [EMaintainer.ID]: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
      },
      [EMaintainer.Name]: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
      initialAutoIncrement: "1000000",
    }
  );

  return Maintainer;
};
