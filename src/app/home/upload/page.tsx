"use client";
import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { resolve } from "path";
import { RcFile } from "antd/es/upload";
import axios from "axios";
import COS from "cos-js-sdk-v5";
import { ENV_LOCAL } from "@constants/config";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
const { Dragger } = Upload;

const App: React.FC = () => {
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

  return (
    <div style={{ maxWidth: "800px" }}>
      <img
        src="https://cjxt-1325833079.cos.ap-nanjing.myqcloud.com/up/2024-04-29/f7NbhLQGMaumguFJi4GgE.jpg"
        width="300"
      />
      <Dragger
        name="file"
        multiple
        action={(file: RcFile) => {
          if (!cos) {
            message.error("初始化对象存储失败，请刷新重试");
            return Promise.reject("failed");
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
                  1024 *
                  1024 *
                  5 /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */,
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
                  console.log("上传失败", err);
                  message.error(err.message ?? "上传失败");
                  return reject(err);
                }
                message.success("上传成功");
                console.log("上传成功", data);
                resolve(`https://${data.Location}`);
              }
            );
          });
        }}
        onChange={(info) => {
          const { status } = info.file;
          if (status !== "uploading") {
            console.log(info.file, info.fileList);
          }
          if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        }}
        onDrop={(e) => {
          console.log("Dropped files", e.dataTransfer.files);
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      <div>录入信息如下</div>
      <h1>属地单位：张集供电所</h1>
      <h1>
        项目必要性 - 计划来源：高故障线路、防山火隐患治理，网架结构改造需求
      </h1>
    </div>
  );
};

export default App;
