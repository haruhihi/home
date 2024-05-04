import { IPlanDetailRes, Res200, Res500 } from "@dtos/api";
import { EPerson, EPlan } from "@dtos/db";
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
    const { Plan, Person } = await getModels();
    const plan = (await Plan.findByPk(id)) as any;
    if (!plan) {
      throw new Error(`未找到 id: ${id} 的计划`);
    }

    let people: any[] = [];
    const whereOptions: WhereOptions = {};
    if (plan[EPlan.Section.Name]) {
      // if section is null, find no people
      whereOptions[EPerson.SectionId] = plan[EPlan.Section.Name];
      people = await Person.findAll({
        where: whereOptions,
      });
    }
    const result: IPlanDetailRes = { plan, people };
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
