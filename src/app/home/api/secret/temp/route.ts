import { ENV_LOCAL } from "@constants/config";
import { Res200 } from "@dtos/api";

const STS = require("./sts");

const config = {
  secretId: ENV_LOCAL.COS_SECRET_ID, // 固定密钥
  secretKey: ENV_LOCAL.COS_SECRET_KEY, // 固定密钥
  proxy: "",
  durationSeconds: 24 * 60 * 60,
  // host: 'sts.tencentcloudapi.com', // 域名，非必须，默认为 sts.tencentcloudapi.com
  endpoint: "sts.tencentcloudapi.com", // 域名，非必须，与host二选一，默认为 sts.tencentcloudapi.com

  // 放行判断相关参数
  bucket: ENV_LOCAL.NEXT_PUBLIC_COS_BUCKET!,
  region: ENV_LOCAL.NEXT_PUBLIC_COS_REGION,
  allowPrefix: `${ENV_LOCAL.NEXT_PUBLIC_COS_PREFIX}/*`, // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
  // 简单上传和分片，需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
  allowActions: [
    // 简单上传
    "name/cos:PutObject",
    "name/cos:PostObject",
    // 分片上传
    "name/cos:InitiateMultipartUpload",
    "name/cos:ListMultipartUploads",
    "name/cos:ListParts",
    "name/cos:UploadPart",
    "name/cos:CompleteMultipartUpload",
  ],
};

export async function POST(request: Request) {
  // TODO 这里根据自己业务需要做好放行判断

  // 获取临时密钥
  var shortBucketName = config.bucket.substr(0, config.bucket.lastIndexOf("-"));
  var appId = config.bucket.substr(1 + config.bucket.lastIndexOf("-"));
  var policy = {
    version: "2.0",
    statement: [
      {
        action: config.allowActions,
        effect: "allow",
        principal: { qcs: ["*"] },
        resource: [
          "qcs::cos:" +
            config.region +
            ":uid/" +
            appId +
            ":prefix//" +
            appId +
            "/" +
            shortBucketName +
            "/" +
            config.allowPrefix,
        ],
        // condition生效条件，关于 condition 的详细设置规则和COS支持的condition类型可以参考https://cloud.tencent.com/document/product/436/71306
        // 'condition': {
        //   // 比如限定ip访问
        //   'ip_equal': {
        //     'qcs:ip': '10.121.2.10/24'
        //   }
        // }
      },
    ],
  };

  const result = await new Promise((resolve) => {
    STS.getCredential(
      {
        secretId: config.secretId,
        secretKey: config.secretKey,
        proxy: config.proxy,
        durationSeconds: config.durationSeconds,
        endpoint: config.endpoint,
        policy: policy,
      },
      function (err: Error, tempKeys: any) {
        var result = JSON.stringify(err || tempKeys) || "";
        resolve(result);
      }
    );
  });

  return new Response(Res200({ result }), {
    status: 200,
  });
}
