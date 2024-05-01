import { ISearchReq, ISearchRes, Res200, Res500 } from "@dtos/api";
import { EPlan } from "@dtos/db";
import { getModels } from "@utils/db";
import dayjs from "dayjs";
import { Op, WhereOptions, where } from "sequelize";

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const pageStr = params.get("page");
    const pageSizeStr = params.get("pageSize");
    const page = Number(pageStr);
    const pageSize = Number(pageSizeStr);
    if (!pageStr || !pageStr || page < 1 || pageSize < 1) {
      throw new Error(`非法的 page: ${pageStr}, pageSize: ${pageSizeStr}`);
    }

    const whereOptions = [
      EPlan.Section,
      EPlan.Construction,
      EPlan.Place,
      EPlan.ElectricLevel,
    ].reduce<WhereOptions>((acc: any, cur) => {
      if (
        params.has(cur) &&
        params.get(cur) !== "" &&
        params.get(cur) !== null
      ) {
        acc[cur] = {
          [Op.substring]: params.get(cur),
        };
      }
      return acc;
    }, {});

    if (
      params.has(EPlan.ConstructionDate) &&
      params.get(EPlan.ConstructionDate) !== "" &&
      params.get(EPlan.ConstructionDate) !== null
    ) {
      (whereOptions as any)[EPlan.ConstructionDate] = dayjs(
        params.get(EPlan.ConstructionDate)
      ).toISOString();
    }

    const { Plan } = await getModels();
    const { count, rows } = await Plan.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      where: whereOptions,
    });

    const result: ISearchRes = {
      totalCount: count,
      totalPages: 3,
      data: rows,
    };

    return new Response(Res200({ result }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      Res500({ result: `error: ${(error as Error)?.message ?? ""}` }),
      {
        status: 500,
      }
    );
  }
}
