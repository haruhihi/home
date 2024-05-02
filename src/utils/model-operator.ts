import { EOperator } from "@dtos/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";
import { TModel } from "./db";

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
  await Operator.sync(syncOptions);
  if (syncOptions?.force) {
    await initOperator(Operator);
  }
  return Operator;
};

export const initOperator = async (Operator: TModel) => {
  // sequelize create multiple rows in one line code
  await Operator.bulkCreate(
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
      "计量班",
      "荆能分公司",
      "中电凯源科技有限公司",
      "湖北祥静电力工程有限公司",
      "湖北永兴机电科技工程有限公司",
      "四川省华中建设集团有限公司",
      "武汉天泽砾工程有限公司",
      "湖南帆宇电力建设有限公司",
    ].map((name) => ({
      [EOperator.Name]: name,
    }))
  );
};
