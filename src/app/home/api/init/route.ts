import { Res200, Res500 } from "@dtos/api";
import { EPlan } from "@dtos/db";
import { getModels } from "@utils/db";
import { initMaintainerModel } from "@utils/model-maintainer";
import { initOperatorModel } from "@utils/model-operator";
import { initPlanModel } from "@utils/model-plan";
import { initUserModel } from "@utils/model-user";

export async function GET(request: Request) {
  try {
    // if the params has force=true, force init the models
    const params = new URL(request.url).searchParams;
    const force = params.get("force");
    if (force === "1") {
      const { sequelize } = await getModels();
      // 禁用外键约束
      // await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
      // sequelize.sync({ force: true });

      const User = await initUserModel(sequelize, { force: true });
      const Plan = await initPlanModel(sequelize, { force: true });
      const Maintainer = await initMaintainerModel(sequelize, { force: true });
      const Operator = await initOperatorModel(sequelize, { force: true });

      // 启用外键约束
      // await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });
      return new Response(Res200({ result: "successful force init" }), {
        status: 200,
      });
    }

    return new Response(Res200({ result: "successful init" }), {
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
