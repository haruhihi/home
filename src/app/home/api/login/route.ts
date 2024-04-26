import { ILoginReq, Res200, Res500 } from "@dtos/api";
import { createSession } from "@utils/session";

export async function POST(request: Request) {
  try {
    const params = (await request.json()) as ILoginReq;
    // TODO use db
    if (params.username === "abc" && params.password === "123") {
      await createSession(params.username);
      return new Response(Res200({ success: true }), {
        status: 200,
      });
    }
    return new Response(Res200({ success: false }), {
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
