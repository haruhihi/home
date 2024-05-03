import { Res200, Res500 } from "@dtos/api";
import { getModels } from "@utils/db";

export async function POST(request: Request) {
  try {
    // get id from http post body
    const params = await request.json();
    const { id } = params;
    if (!id) {
      throw new Error(`非法的 id: ${id}`);
    }
    const { Plan } = await getModels();
    const plan = await Plan.findByPk(id);

    return new Response(Res200({ result: plan }), {
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
