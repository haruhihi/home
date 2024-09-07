import { IPlanDetailRes, ISectionDetailRes, Res200, Res500 } from "@dtos/api";
import { EPerson, EPlan, EPlanSection, ESection, EUser } from "@dtos/db";
import { getModels } from "@utils/db";
import { Op, WhereOptions } from "sequelize";

export async function POST(request: Request) {
  try {
    const params = await request.json();
    const { sectionIds } = params;
    if (!sectionIds) {
      throw new Error(`非法的 sectionIds: ${sectionIds}`);
    }
    const { Person, Section } = await getModels();

    const sections = await Section.findAll({
      where: {
        [ESection.ID.Name]: {
          [Op.in]: sectionIds,
        },
      },
    });
   
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
