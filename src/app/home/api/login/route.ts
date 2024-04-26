import { ILoginReq, Res200, Res500 } from "@dtos/api";

export async function POST(request: Request) {
  try {
    const params = (await request.json()) as ILoginReq;
    // TODO use db
    if (
      params.username === "tai_zz@163.com" &&
      params.password === "5991123122/*t"
    ) {
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
