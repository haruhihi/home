import { ISearchReq, ISearchRes, Res200, Res500 } from "@dtos/api";
import { getModels } from "@utils/db";

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

    const { Plan, sequelize } = await getModels();
    const { count, rows } = await Plan.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
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
