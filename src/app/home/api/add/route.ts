import { Res200, Res500 } from "@dtos/api";
import { getModels } from "@utils/db";

const createDetail = () => {
  return JSON.stringify({
    desc: Array.from({ length: 200 }, () => {
      const str =
        "张集供电所台区计划来源一停多用指标提升情况负荷停用带电作业开工后过程督办0123456789,:()!@#$%^&*()_+{}|:<>?[];./,~`'";
      return str[Math.floor(Math.random() * str.length)];
    }).join(""),
    imgs: Array.from({ length: Math.floor(Math.random() * 4) + 2 }, () => {
      const arr = [
        "https://img0.baidu.com/it/u=1998198953,349643550&fm=253&fmt=auto&app=120&f=JPEG?w=626&h=353",
        "https://img1.baidu.com/it/u=2422291597,396579871&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=619",
        "https://img0.baidu.com/it/u=173830426,3489666896&fm=253&fmt=auto&app=120&f=JPEG?w=417&h=313",
        "https://img0.baidu.com/it/u=3032045723,164115336&fm=253&fmt=auto&app=120&f=JPEG?w=550&h=444",
        "https://img0.baidu.com/it/u=3953344066,2864724601&fm=253&fmt=auto&app=120&f=JPEG?w=607&h=404",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    }),
  });
};

export async function GET(request: Request) {
  try {
    const { Plan, sequelize } = await getModels();
    const result = await sequelize.transaction(async (t) => {
      const plan = await Plan.create(
        {
          place: `${((arr: any[]) =>
            arr[Math.floor(Math.random() * arr.length)])([
            "牛",
            "马",
            "羊",
            "狗",
            "罗",
            "张",
            "胡",
          ])}集供电所`,
          section: `${Math.floor(Math.random() * 10) + 1}台区`,
          necessityBackground: createDetail(),
          necessityMulti: createDetail(),
          necessityResult: createDetail(),
          cautionCutOff: createDetail(),
          cautionElectric: createDetail(),
          cautionSupervision: createDetail(),
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
