import { EPlan, EPlanStatus } from "@dtos/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";

export const initPlanModel = async (
  sequelize: Sequelize,
  syncOptions?: SyncOptions
) => {
  const Plan = sequelize.define(
    "Plan",
    {
      [EPlan.ID.Name]: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
      },
      [EPlan.Maintainer.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.Operator.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.WorkOwners.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.Workers.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.Status.Name]: {
        defaultValue: EPlanStatus.Pending.Name,
        type: DataTypes.ENUM(
          EPlanStatus.Pending.Name,
          EPlanStatus.Approved.Name,
          EPlanStatus.Rejected.Name
        ),
      },
    },
    {
      // Other model options go here
      initialAutoIncrement: "1000000",
    }
  );

  await Plan.sync(syncOptions);
  return Plan;
};
