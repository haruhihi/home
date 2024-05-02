import { Res200, Res500 } from "@dtos/api";
import { EPlan, EPlanStatus } from "@dtos/db";
import { getModels } from "@utils/db";

export async function POST(request: Request) {
  try {
    const { Plan } = await getModels();
    const body = await request.json();

    const result = await Plan.update(
      {
        [EPlan.Status.Name]: body[EPlan.Status.Name],
      },
      {
        where: {
          [EPlan.ID.Name]: body[EPlan.ID.Name],
        },
      }
    );
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
