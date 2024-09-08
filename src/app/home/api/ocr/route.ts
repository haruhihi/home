import { ENV_LOCAL } from "@constants/config";
import { ILoginReq, IOCRReq, Res200, Res500 } from "@dtos/api";
// import tencentcloud from "tencentcloud-sdk-nodejs-ocr";
const tencentcloud = require("tencentcloud-sdk-nodejs-ocr");


export async function POST(request: Request) {
    try {
        const params = (await request.json()) as IOCRReq;

        if (!params || !params.imageUrl) throw new Error("参数 imageUrl 错误")

        const { imageUrl } = params

        const OcrClient = tencentcloud.ocr.v20181119.Client;

        const clientConfig = {
            credential: {
                secretId: ENV_LOCAL.COS_SECRET_ID,
                secretKey: ENV_LOCAL.COS_SECRET_KEY,
            },
            region: "ap-shanghai",
            profile: {
                httpProfile: {
                    endpoint: "ocr.tencentcloudapi.com",
                },
            },
        };

        const client = new OcrClient(clientConfig);
        const data = await client.GeneralBasicOCR({
            ImageUrl: imageUrl
        })

        return new Response(Res200({ success: true, result: data }), {
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
