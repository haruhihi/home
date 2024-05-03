import { ESection } from "@dtos/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";
import { TModel } from "@utils/db";

export const initModel = async (
  sequelize: Sequelize,
  syncOptions?: SyncOptions
) => {
  const Model = sequelize.define(
    "Section",
    {
      [ESection.ID]: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
      },
      [ESection.Name]: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
      initialAutoIncrement: "1000000",
    }
  );
  await Model.sync(syncOptions);

  return Model;
};
