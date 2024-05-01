import { EPlan, EPlanForeign, EUser } from "@dtos/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";
import { TModel } from "./db";

export const initPlanModel = async (
  sequelize: Sequelize,
  options: { User: TModel; Maintainer: TModel; Operator: TModel },
  syncOptions?: SyncOptions
) => {
  const Plan = sequelize.define(
    "Plan",
    {
      [EPlan.ID]: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      // 供电所
      [EPlan.Place]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // 台区
      [EPlan.Section]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // 施工单位
      [EPlan.Construction]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // 时间
      [EPlan.ConstructionDate]: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // 电压等级
      [EPlan.ElectricLevel]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
    }
  );
  // Plan.hasOne(options.User, { foreignKey: EPlanForeign.Worker, as: "Worker" });
  // Plan.hasOne(options.User, {
  //   foreignKey: EPlanForeign.WorkOwner,
  //   as: "WorkOwner",
  // });
  // Plan.hasOne(options.Maintainer);
  // Plan.hasOne(options.Operator);

  await Plan.sync(syncOptions);
  return Plan;
};
