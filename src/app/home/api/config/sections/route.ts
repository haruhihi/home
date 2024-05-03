import { Res200, Res500 } from "@dtos/api";
import { getSelectionOptions } from "./help";

export async function GET(request: Request) {
  try {
    // get name param from request
    const name = new URL(request.url).searchParams.get("name");
    if (!name)
      return new Response(
        Res200({
          result: [],
        }),
        {
          status: 200,
        }
      );
    return new Response(
      Res200({
        result: await getSelectionOptions(name),
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
