import { TIME_RANGE_SEPARATOR } from "@constants/config";
import { ICreateReq, Res200, Res500 } from "@dtos/api";
import { EPlan, EPlanSection } from "@dtos/db";
import { getModels } from "@utils/db";

export async function POST(request: Request) {
  try {
    // parse body of POST request
    const params = (await request.json()) as ICreateReq;
    const { Plan, PlanSection, sequelize } = await getModels();
    const result = await sequelize.transaction(async (t) => {
      const plan = await Plan.create(
        {
          [EPlan.Maintainer.Name]: params[EPlan.Maintainer.Name],
          [EPlan.Operator.Name]: params[EPlan.Operator.Name],
          [EPlan.WorkOwners.Name]: (params[EPlan.WorkOwners.Name] ?? []).join(
            ","
          ),
          [EPlan.Workers.Name]: (params[EPlan.Workers.Name] ?? []).join(","),
          [EPlan.VoltageLevel.Name]: params[EPlan.VoltageLevel.Name],
          [EPlan.SpecialWorkers.Name]: (
            params[EPlan.SpecialWorkers.Name] ?? []
          ).join(","),
          [EPlan.Classification.Name]: params[EPlan.Classification.Name],
          [EPlan.WorkRiskLevel.Name]: params[EPlan.WorkRiskLevel.Name],
          [EPlan.ElectricRiskLevel.Name]: params[EPlan.ElectricRiskLevel.Name],
          [EPlan.WorkContent.Name]: params[EPlan.WorkContent.Name],
          [EPlan.WithElectric.Name]: params[EPlan.WithElectric.Name],
          [EPlan.WithElectricWorkText.Name]:
            params[EPlan.WithElectricWorkText.Name],
          [EPlan.WithElectricWorkImgs.Name]: (
            params[EPlan.WithElectricWorkImgs.Name] ?? []
          ).join(","),
          [EPlan.PowerCut.Name]: params[EPlan.PowerCut.Name],
          [EPlan.VerificationText.Name]: params[EPlan.VerificationText.Name],
          [EPlan.VerificationImgs.Name]: (
            params[EPlan.VerificationImgs.Name] ?? []
          ).join(","),
          [EPlan.Overview.Name]: (params[EPlan.Overview.Name] ?? []).join(","),
          [EPlan.BirdsEye.Name]: (params[EPlan.BirdsEye.Name] ?? []).join(","),
          [EPlan.HighRiskPlaceText.Name]: params[EPlan.HighRiskPlaceText.Name],
          [EPlan.HighRiskPlaceImgs.Name]: (
            params[EPlan.HighRiskPlaceImgs.Name] ?? []
          ).join(","),
          [EPlan.LoadStop.Name]: params[EPlan.LoadStop.Name],
          [EPlan.LoadShifting.Name]: params[EPlan.LoadShifting.Name],
          [EPlan.EquipmentCondition.Name]:
            params[EPlan.EquipmentCondition.Name],
          [EPlan.PatrolSwitch.Name]: params[EPlan.PatrolSwitch.Name],
          [EPlan.PowerOutMethod.Name]: params[EPlan.PowerOutMethod.Name],
          [EPlan.PowerOutPlace.Name]: params[EPlan.PowerOutPlace.Name],
          [EPlan.ExpectStartAt.Name]: params[EPlan.ExpectStartAt.Name],
          [EPlan.ExpectFinishAt.Name]: params[EPlan.ExpectFinishAt.Name],
          [EPlan.LoadStopAt.Name]: params[EPlan.LoadStopAt.Name],
          [EPlan.WithElectricWorkTimeRange.Name]: (
            params[EPlan.WithElectricWorkTimeRange.Name] ?? []
          ).join(TIME_RANGE_SEPARATOR),
          [EPlan.WithElectricWorkTimeRange2.Name]: (
            params[EPlan.WithElectricWorkTimeRange2.Name] ?? []
          ).join(TIME_RANGE_SEPARATOR),
          [EPlan.PlanSourceText.Name]: params[EPlan.PlanSourceText.Name],
          [EPlan.PlanSourceImgs.Name]: (
            params[EPlan.PlanSourceImgs.Name] ?? []
          ).join(","),
          [EPlan.OneStopMultiUseText.Name]:
            params[EPlan.OneStopMultiUseText.Name],
          [EPlan.OneStopMultiUseImgs.Name]: (
            params[EPlan.OneStopMultiUseImgs.Name] ?? []
          ).join(","),
          [EPlan.MetricsImprovementText.Name]:
            params[EPlan.MetricsImprovementText.Name],
          [EPlan.MetricsImprovementImgs.Name]: (
            params[EPlan.MetricsImprovementImgs.Name] ?? []
          ).join(","),
          [EPlan.PowerOutageHomesText.Name]:
            params[EPlan.PowerOutageHomesText.Name],
          [EPlan.PowerOutageHomesImgs.Name]: (
            params[EPlan.PowerOutageHomesImgs.Name] ?? []
          ).join(","),
          [EPlan.EquipmentAllocation.Name]: (
            params[EPlan.EquipmentAllocation.Name] ?? []
          ).join(","),
          [EPlan.EquipmentAllocationId.Name]:
            params[EPlan.EquipmentAllocationId.Name],
          [EPlan.MaterialAllocation.Name]: (
            params[EPlan.MaterialAllocation.Name] ?? []
          ).join(","),
          [EPlan.OnSiteWork.Name]: params[EPlan.OnSiteWork.Name],
        },
        { transaction: t }
      );

      // update planSection table
      const sectionIds = params[EPlan.Section.Name];
      if (plan && Array.isArray(sectionIds) && sectionIds.length > 0) {
        await PlanSection.bulkCreate(
          sectionIds.map((sectionId) => ({
            [EPlanSection.PlanId]: (plan as any)[EPlan.ID.Name],
            [EPlanSection.SectionId]: sectionId,
          })),
          { transaction: t }
        );
      }

      return plan;
    });
    return new Response(Res200({ result: result.toJSON() }), {
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return new Response(
      Res500({ result: `error: ${(error as Error)?.message ?? ""}` }),
      {
        status: 500,
      }
    );
  }
}
