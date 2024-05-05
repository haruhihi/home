import { ISearchRes, Res200, Res500 } from "@dtos/api";
import { EPlan, EUser } from "@dtos/db";
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
      EPlan.Maintainer.Name,
      EPlan.Operator.Name,
      EPlan.Section.Name,
    ].reduce<WhereOptions>((acc: any, cur) => {
      const param = params.get(cur);
      if (param !== null) {
        acc[cur] = {
          [Op.in]: param.split(","),
        };
      }
      return acc;
    }, {});

    if (
      params.has(EPlan.ExpectStartAt.Name) &&
      params.get(EPlan.ExpectStartAt.Name) !== "" &&
      params.get(EPlan.ExpectStartAt.Name) !== null
    ) {
      const current = dayjs(params.get(EPlan.ExpectStartAt.Name));
      (whereOptions as any)[EPlan.ExpectStartAt.Name] = {
        [Op.between]: [
          current.startOf("day").toISOString(),
          current.endOf("day").toISOString(),
        ],
      };
    }

    if (
      params.has(EPlan.VoltageLevel.Name) &&
      params.get(EPlan.VoltageLevel.Name) !== "" &&
      params.get(EPlan.VoltageLevel.Name) !== null
    ) {
      (whereOptions as any)[EPlan.VoltageLevel.Name] = params.get(
        EPlan.VoltageLevel.Name
      );
    }

    if (
      params.has(EPlan.WithElectric.Name) &&
      params.get(EPlan.WithElectric.Name) !== "" &&
      params.get(EPlan.WithElectric.Name) !== null
    ) {
      (whereOptions as any)[EPlan.WithElectric.Name] = params.get(
        EPlan.WithElectric.Name
      );
    }
    // console.log("whereOptions", whereOptions);
    const { Plan } = await getModels();
    const { count, rows } = await Plan.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      where: whereOptions,
      order: [["updatedAt", "DESC"]],
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
