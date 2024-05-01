import { ICreateReq, Res200, Res500 } from "@dtos/api";
import { EPlan, EPlanForeign } from "@dtos/db";
import { getModels } from "@utils/db";

export async function POST(request: Request) {
  try {
    // parse body of POST request
    const params = (await request.json()) as ICreateReq;
    const { Plan, sequelize } = await getModels();
    const result = await sequelize.transaction(async (t) => {
      const plan = await Plan.create(
        {
          [EPlan.Place]: `${((arr: any[]) =>
            arr[Math.floor(Math.random() * arr.length)])([
            "牛",
            "马",
            "羊",
            "狗",
            "罗",
            "张",
            "胡",
          ])}集供电所`,
          [EPlan.Section]: `${Math.floor(Math.random() * 10) + 1}台区`,
          [EPlan.Construction]: `${Math.floor(Math.random() * 10) + 1}${
            Math.floor(Math.random() * 10) + 1
          }${Math.floor(Math.random() * 10) + 1}施工队`,
          // random year, month day
          [EPlan.ConstructionDate]: new Date(
            2024 + Math.floor(Math.random() * 2),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28)
          ),
          [EPlan.ElectricLevel]: `${((arr: any[]) =>
            arr[Math.floor(Math.random() * arr.length)])([
            "10kV",
            "35kV",
            "110kV",
            "220kV",
            "500kV",
          ])}`,
          [EPlanForeign.Worker]: params[EPlanForeign.Worker],
          [EPlanForeign.WorkOwner]: params[EPlanForeign.WorkOwner],
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
