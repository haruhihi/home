import { Res200, Res500 } from "@dtos/api";
import { EUser } from "@dtos/db";
import { decrypt } from "@utils/session";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  // Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  if (!session) {
    return new Response(Res500({ result: "登录失效" }), {
      status: 500,
    });
  }
  return new Response(
    Res200({
      result: {
        [EUser.Account]: session[EUser.Account],
        [EUser.Role]: session[EUser.Role],
      },
    }),
    {
      status: 200,
    }
  );
}
