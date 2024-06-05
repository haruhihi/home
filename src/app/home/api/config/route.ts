import { IFormConfigRes, Res200, Res500 } from "@dtos/api";
import { EUser } from "@dtos/db";
import {
  getMaintainerOptions,
  getOperatorOptions,
  getUsersOptions,
} from "./help";

export async function POST(request: Request) {
  try {
    const userOptions = await getUsersOptions();
    const result: IFormConfigRes = {
      workOwnerOptions:
        userOptions
          .filter((user: any) => user[EUser.IsWorkOwner])
          .map((row) => {
            return {
              label: (row as any)[EUser.Name],
              value: (row as any)[EUser.ID],
            };
          }) ?? [],
      workerOptions:
        userOptions
          .filter((user: any) => user[EUser.IsWorker])
          .map((row) => {
            return {
              label: (row as any)[EUser.Name],
              value: (row as any)[EUser.ID],
            };
          }) ?? [],
      specialWorkerOptions:
        userOptions
          .filter((user: any) => user[EUser.SpecialWork] !== "")
          .map((row) => {
            return {
              label: (row as any)[EUser.Name],
              value: (row as any)[EUser.ID],
            };
          }) ?? [],
      maintainerOptions: await getMaintainerOptions(),
      operatorOptions: await getOperatorOptions(),
    };
    return new Response(
      Res200({
        result,
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
