import { EMaintainer, EPlan, EUser } from "@dtos/db";
import {
  DataTypes,
  Model,
  ModelStatic,
  Sequelize,
  SyncOptions,
} from "sequelize";
import { TModel } from "./db";

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
  await Maintainer.sync(syncOptions);
  if (syncOptions?.force) {
    await initMaintainer(Maintainer);
  }
  return Maintainer;
};

export const initMaintainer = async (Maintainer: TModel) => {
  // sequelize create multiple rows in one line code
  await Maintainer.bulkCreate(
    [
      "胡集",
      "双河",
      "磷矿",
      "金山",
      "石牌",
      "文集",
      "冷水",
      "洋梓",
      "丰乐",
      "长寿",
      "官庄湖",
      "九里",
      "客店",
      "旧口",
      "张集",
      "东桥",
      "长滩",
      "城区供服站",
      "郢中",
      "柴湖",
      "路灯所",
      "运检工区",
    ].map((name) => ({
      [EMaintainer.Name]: name,
    }))
  );
};
