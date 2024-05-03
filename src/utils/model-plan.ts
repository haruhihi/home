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
      [EPlan.VoltageLevel.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.SpecialWorkers.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.Section.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.Classification.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.WorkRiskLevel.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.ElectricRiskLevel.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.WorkContent.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.WithElectric.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.WithElectricWorkText.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.WithElectricWorkImgs.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.PowerCut.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.VerificationText.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.VerificationImgs.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.Overview.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.BirdsEye.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.HighRiskPlaceText.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.HighRiskPlaceImgs.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.LoadStop.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.LoadShifting.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.EquipmentCondition.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.PatrolSwitch.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.PowerOutMethod.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.PowerOutPlace.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.ExpectStartAt.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.ExpectFinishAt.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.LoadStopAt.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.WithElectricWorkStartAt.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.PlanSourceText.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.PlanSourceImgs.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.OneStopMultiUseText.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.OneStopMultiUseImgs.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.MetricsImprovementText.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.MetricsImprovementImgs.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.PowerOutageHomesText.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.PowerOutageHomesImgs.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.ServicePlan.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.ServicePlanContent.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.EquipmentAllocation.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.EquipmentAllocationId.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.MaterialAllocation.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.OnSiteWork.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.AuditComment.Name]: {
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
