import { DefaultUserName, DefaultUserPassword } from "@constants/config";
import { ILoginReq, Res200, Res500 } from "@dtos/api";
import { EUser } from "@dtos/db";
import { getModels } from "@utils/db";
import { createSession } from "@utils/session";

export async function POST(request: Request) {
  try {
    const params = (await request.json()) as ILoginReq;
    const { User } = await getModels();

    if (!params[EUser.Account] || !params[EUser.Password]) {
      return new Response(Res500({ result: "请输入合法的账号密码" }), {
        status: 500,
      });
    }
    const user = await User.findOne({
      where: {
        [EUser.Account]: params[EUser.Account],
        [EUser.Password]: params[EUser.Password],
      },
    });

    if (!user) {
      return new Response(Res500({ result: "请输入正确的账号密码" }), {
        status: 500,
      });
    }
    await createSession((user as any)[EUser.ID], (user as any)[EUser.Role]);
    return new Response(Res200({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.log('err', error);
    return new Response(
      Res500({ result: `error: ${(error as Error)?.message ?? ""}` }),
      {
        status: 500,
      }
    );
  }
}
