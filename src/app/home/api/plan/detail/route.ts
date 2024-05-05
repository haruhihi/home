import { IPlanDetailRes, Res200, Res500 } from "@dtos/api";
import { EPerson, EPlan, EPlanSection, ESection } from "@dtos/db";
import { getModels } from "@utils/db";
import { Op, WhereOptions } from "sequelize";

export async function POST(request: Request) {
  try {
    // get id from http post body
    const params = await request.json();
    const { id } = params;
    if (!id) {
      throw new Error(`非法的 id: ${id}`);
    }
    const { Plan, Person, PlanSection, Section } = await getModels();
    const plan = (await Plan.findByPk(id)) as any;
    if (!plan) {
      throw new Error(`未找到 id: ${id} 的计划`);
    }

    // find related sections
    const planSections = await PlanSection.findAll({
      where: {
        [EPlanSection.PlanId]: id,
      },
    });

    const sections = await Section.findAll({
      where: {
        [ESection.ID]: {
          [Op.in]: planSections.map(
            (ps) => (ps as any)[EPlanSection.SectionId]
          ),
        },
      },
    });

    // find section related people

    let people: any[] = [];
    if (
      Array.isArray(planSections) &&
      planSections &&
      planSections.length > 0
    ) {
      // if section is null, find no people
      people = await Person.findAll({
        where: {
          [EPerson.SectionId]: {
            [Op.in]: planSections.map(
              (ps) => (ps as any)[EPlanSection.SectionId]
            ),
          },
        },
      });
    }
    const result: IPlanDetailRes = { plan, people, sections };
    return new Response(Res200({ result }), {
      status: 200,
    });
  } catch (error) {
    console.error("error", error);
    return new Response(
      Res500({ result: `error: ${(error as Error)?.message ?? ""}` }),
      {
        status: 500,
      }
    );
  }
}
