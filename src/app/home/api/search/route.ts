import { Res200, Res500 } from "@dtos/api";
import { getModels } from "@utils/db";

export async function GET(request: Request) {
  try {
    const { Plan, sequelize } = await getModels();
    const { count, rows } = await Plan.findAndCountAll({
      offset: 0,
      limit: 10,
    });

    return new Response(
      Res200({
        result: {
          count,
          rows,
        },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      Res500({ result: `error: ${(error as Error)?.message ?? ""}` }),
      {
        status: 500,
      }
    );
  }
}
