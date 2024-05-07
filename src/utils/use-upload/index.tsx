import { useEffect, useState } from "react";
import COS from "cos-js-sdk-v5";
import { uploadFileToCOS } from "./upload-file";
import { ProFormUploadButtonProps } from "@ant-design/pro-components";
import axios from "axios";
import { message } from "antd";

export const useUpload = () => {
  const [cos, setCOS] = useState<COS>();

  // 初始化实例
  useEffect(() => {
    const cos = new COS({
      // getAuthorization 必选参数
      getAuthorization: function (options, callback) {
        // 初始化时不会调用，只有调用 cos 方法（例如 cos.putObject）时才会进入
        // 异步获取临时密钥
        // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
        // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
        // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048

        axios
          .get("/home/api/secret/temp")
          .then((res) => {
            const result = JSON.parse(res.data.result);
            const { credentials, startTime, expiredTime } = result;
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              SecurityToken: credentials.sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: expiredTime, // 时间戳，单位秒，如：1580000000
            });
          })
          .catch((err) => {
            message.error(err.message ?? "获取临时密钥失败");
          });
      },
    });
    setCOS(cos);
  }, []);

  const commonUploadProps: Partial<ProFormUploadButtonProps> = {
    // onPreview: handlePreview,
    width: "xl" as const,
    fieldProps: {
      showUploadList: {
        showPreviewIcon: false,
      },
      customRequest: async (options: any) => {
        const file = options.file as any;
        console.log(file);
        try {
          const res = await uploadFileToCOS(file as any, cos!, (progress) => {
            file.progress = Math.floor(progress.percent * 100);
            const event = new Event("progress");
            (event as any).percent = progress.percent * 100;
            options.onProgress?.(event);
          });
          file.status = "done";
          file.url = res;
          options.onSuccess?.(res);
          message.success("上传成功");
        } catch (err) {
          message.error("上传失败");
          file.status = "fail";
          options.onError?.(new Error());
        }
      },
    },
    action: "http://secret",
    listType: "picture-card",
  };

  return { commonUploadProps };
};
