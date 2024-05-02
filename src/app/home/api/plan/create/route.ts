import { ICreateReq, Res200, Res500 } from "@dtos/api";
import { EPlan } from "@dtos/db";
import { getModels } from "@utils/db";

export async function POST(request: Request) {
  try {
    // parse body of POST request
    const params = (await request.json()) as ICreateReq;
    const { Plan, User, sequelize } = await getModels();
    const result = await sequelize.transaction(async (t) => {
      const plan = await Plan.create(
        {
          [EPlan.Maintainer.Name]: params[EPlan.Maintainer.Name],
          [EPlan.Operator.Name]: params[EPlan.Operator.Name],
          [EPlan.WorkOwners.Name]: params[EPlan.WorkOwners.Name].join(","),
          [EPlan.Workers.Name]: params[EPlan.Workers.Name].join(","),
        },
        { transaction: t }
      );

      return plan;
    });
    console.log("result", result.toJSON());
    return new Response(Res200({ result: result.toJSON() }), {
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
