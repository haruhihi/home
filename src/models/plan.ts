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
        type: DataTypes.TEXT,
      },
      [EPlan.Operator.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.WorkOwners.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.Workers.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.VoltageLevel.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.SpecialWorkers.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.Section.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.Classification.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.WorkRiskLevel.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.ElectricRiskLevel.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.WorkContent.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.WithElectric.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.WithElectricWorkText.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.WithElectricWorkImgs.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.PowerCut.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.VerificationText.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.VerificationImgs.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.Overview.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.BirdsEye.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.HighRiskPlaceText.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.HighRiskPlaceImgs.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.LoadStop.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.LoadShifting.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.EquipmentCondition.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.PatrolSwitch.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.PowerOutMethod.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.PowerOutPlace.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.ExpectStartAt.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.ExpectFinishAt.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.LoadStopAt.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.WithElectricWorkTimeRange.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.WithElectricWorkTimeRange2.Name]: {
        type: DataTypes.STRING,
      },
      [EPlan.PlanSourceText.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.PlanSourceImgs.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.OneStopMultiUseText.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.OneStopMultiUseImgs.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.MetricsImprovementText.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.MetricsImprovementImgs.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.PowerOutageHomesText.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.PowerOutageHomesImgs.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.ServicePlan.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.ServicePlanContent.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.EquipmentAllocation.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.EquipmentAllocationId.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.MaterialAllocation.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.OnSiteWork.Name]: {
        type: DataTypes.TEXT,
      },
      [EPlan.AuditComment.Name]: {
        type: DataTypes.TEXT,
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

  return Plan;
};
