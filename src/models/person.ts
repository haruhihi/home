import { EPerson } from "@dtos/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";

export const initModel = async (
  sequelize: Sequelize,
  syncOptions?: SyncOptions
) => {
  const Model = sequelize.define(
    "People",
    {
      [EPerson.ID]: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
      },
      [EPerson.Name]: {
        type: DataTypes.STRING,
      },
      [EPerson.PhoneNum]: {
        type: DataTypes.STRING,
      },
      [EPerson.Risk]: {
        type: DataTypes.STRING,
      },
      [EPerson.SectionId]: {
        type: DataTypes.INTEGER,
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
