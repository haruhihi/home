import { ENV_LOCAL } from "@constants/config";
import { message } from "antd";
import { RcFile } from "antd/es/upload";
import COS, { ProgressInfo } from "cos-js-sdk-v5";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

export const uploadFile = (
  file: RcFile,
  cos: COS,
  onProgress: (progressData: ProgressInfo) => void
) => {
  if (!cos) {
    return Promise.reject("初始化对象存储失败，请刷新重试");
  }
  return new Promise((resolve, reject) => {
    cos.uploadFile(
      {
        Bucket:
          ENV_LOCAL.NEXT_PUBLIC_COS_BUCKET! /* 填入您自己的存储桶，必须字段 */,
        Region:
          ENV_LOCAL.NEXT_PUBLIC_COS_REGION! /* 存储桶所在地域，例如ap-beijing，必须字段 */,
        Key: `${ENV_LOCAL.NEXT_PUBLIC_COS_PREFIX}/${dayjs().format(
          "YYYY-MM-DD"
        )}/${nanoid()}.${
          // 获取文件后缀
          file.name.split(".").pop() ?? "jpg"
        }` /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
        Body: file /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */,
        SliceSize:
          1024 * 1024 * 5 /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */,
        onTaskReady: function (taskId) {
          /* 非必须 */
          console.log(taskId);
        },
        onProgress: function (progressData) {
          /* 非必须 */
          console.log(JSON.stringify(progressData));
        },
        onFileFinish: function (err, data, options) {
          /* 非必须 */
          console.log(options.Key + "上传" + (err ? "失败" : "完成"));
        },
        // 支持自定义headers 非必须
        Headers: {
          "x-cos-meta-test": 123,
        },
      },
      function (err, data) {
        if (err) {
          return reject(err.message ?? "上传失败");
        }
        resolve(`https://${data.Location}`);
      }
    );
  });
};
