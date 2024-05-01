import { IFormConfigRes, Res200, Res500 } from "@dtos/api";
import { EPlan, EUser } from "@dtos/db";
import { getModels } from "@utils/db";
import {
  getMaintainerOptions,
  getOperatorOptions,
  getWorkOwnerOptions,
  getWorkerOptions,
} from "./help";

export async function GET(request: Request) {
  try {
    const result: IFormConfigRes = {
      workOwnerOptions: await getWorkOwnerOptions(),
      workerOptions: await getWorkerOptions(),
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
