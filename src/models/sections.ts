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
  if (syncOptions?.force) {
    await init(Model);
  }
  return Model;
};

export const init = async (Model: TModel) => {
  // sequelize create multiple rows in one line code
  await Model.bulkCreate(
    ["皇庄1#台区", "皇庄2#台区", "宫塘1#台区", "宫塘2#台区", "宫塘3#台区"].map(
      (name) => ({
        [ESection.Name]: name,
      })
    )
  );
};
