import { IPlanDetailRes, ISectionDetailRes, Res200, Res500 } from "@dtos/api";
import { EPerson, EPlan, EPlanSection, ESection, EUser } from "@dtos/db";
import { getModels } from "@utils/db";
import { Op, WhereOptions } from "sequelize";

export async function POST(request: Request) {
  try {
    // get id from http post body
    const params = await request.json();
    const { sectionIds } = params;
    if (!sectionIds) {
      throw new Error(`非法的 sectionIds: ${sectionIds}`);
    }
    const { Person, Section } = await getModels();
    // const plan = (await Plan.findByPk(id)) as any;
    // if (!plan) {
    //   throw new Error(`未找到 id: ${id} 的计划`);
    // }

    // // find related sections
    // const planSections = await PlanSection.findAll({
    //   where: {
    //     [EPlanSection.PlanId]: id,
    //   },
    // });

    const sections = await Section.findAll({
      where: {
        [ESection.ID.Name]: {
          [Op.in]: sectionIds,
        },
      },
    });
    // find special workers

    // const workOwners = await User.findAll({
    //   where: {
    //     [EUser.ID]: {
    //       [Op.in]: [...(plan[EPlan.WorkOwners.Name] ?? "").split(",")],
    //     },
    //   },
    // });
    // const specialWorkers = await User.findAll({
    //   where: {
    //     [EUser.ID]: {
    //       [Op.in]: [...(plan[EPlan.SpecialWorkers.Name] ?? "").split(",")],
    //     },
    //   },
    // });
    // const workers = await User.findAll({
    //   where: {
    //     [EUser.ID]: {
    //       [Op.in]: [...(plan[EPlan.Workers.Name] ?? "").split(",")],
    //     },
    //   },
    // });

    // find section related people

    const people = await Person.findAll({
        where: {
          [EPerson.SectionId]: {
            [Op.in]: sectionIds,
          },
        },
      });

    const result: ISectionDetailRes = {
      people,
      sections,
    };
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
