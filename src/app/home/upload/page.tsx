"use client";
import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  Button,
  Col,
  Divider,
  message,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { resolve } from "path";
import { RcFile } from "antd/es/upload";
import axios from "axios";
import COS from "cos-js-sdk-v5";
import { ENV_LOCAL } from "@constants/config";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import {
  PageContainer,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProLayout,
} from "@ant-design/pro-components";
import { maintainTeamOptions, operationTeamOptions } from "./help";
import { uploadFile } from "./upload-file";
const { Dragger } = Upload;

const App: React.FC = () => {
  const [cos, setCOS] = useState<COS>();
  const operatorOptions = [
    "台沛麒",
    "李斌建",
    "杨家辉",
    "1台沛麒",
    "1李斌建",
    "1杨家辉",
    "2台沛麒",
    "2李斌建",
    "2杨家辉",
    "3台沛麒",
    "3李斌建",
    "3杨家辉",
  ].map((item) => ({
    label: item,
    value: item,
  }));

  const areaOptions = [
    "皇庄1#台区",
    "皇庄2#台区",
    "皇庄3#台区",
    "宫塘1#台区",
    "宫塘2#台区",
    "宫塘3#台区",
    "宫塘4#台区",
  ].map((item) => ({
    label: item,
    value: item,
  }));

  const specificAreaOptions = ["配电", "营销", "设备", "产业"].map((item) => ({
    label: item,
    value: item,
  }));

  const riskLevelOptions = ["一级", "二级", "三级", "四级", "五级"].map(
    (item) => ({
      label: item,
      value: item,
    })
  );

  const electricRiskLevelOptions = [
    "四级",
    "五级",
    "六级",
    "七级",
    "八级",
    "无",
  ].map((item) => ({
    label: item,
    value: item,
  }));

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
    <div>
      <ProForm
        layout="horizontal"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ withElectric: true }}
        onFinish={(values) => {
          console.log("values", values);
        }}
        submitter={{
          render: (props, doms) => {
            return (
              <Row>
                <Col span={14} offset={3}>
                  <Space>{doms}</Space>
                </Col>
              </Row>
            );
          },
        }}
      >
        <Divider orientation="left">
          <h2>单位及人员</h2>
        </Divider>

        <ProFormSelect
          name="maintainTeam"
          options={maintainTeamOptions}
          labelAlign="right"
          width="md"
          label="运维单位"
          required
        />
        <ProFormSelect
          name="operationTeam"
          options={operationTeamOptions}
          label="施工单位"
          width="md"
          required
        />
        <ProFormSelect
          width="md"
          name="maintainPerson"
          label="工作负责人"
          options={operatorOptions}
          mode="multiple"
          required
        />
        <ProFormSelect
          width="md"
          name="operationPerson"
          label="施工人员"
          options={operatorOptions}
          mode="multiple"
          required
        />
        <Divider orientation="left">
          <h2>工作内容</h2>
        </Divider>
        <ProFormSelect
          width="md"
          name="area"
          label="工作范围"
          options={areaOptions}
          mode="multiple"
          required
        />
        <ProFormSelect
          width="md"
          name="specificArea"
          label="专业分类"
          options={specificAreaOptions}
          required
        />
        <ProFormSelect
          width="md"
          name="riskLevel"
          label="作业风险等级"
          options={riskLevelOptions}
          required
        />
        <ProFormSelect
          width="md"
          name="electricRiskLevel"
          label="电网风险等级"
          options={electricRiskLevelOptions}
          required
        />
        <ProFormTextArea
          width="md"
          name="workContent"
          label="作业内容"
          // set height
          fieldProps={{
            autoSize: { minRows: 5 },
          }}
          required
        />
        <ProFormSwitch
          label="带电作业"
          width="md"
          name="withElectric"
          required
        />
        <ProFormDependency name={["withElectric"]}>
          {({ withElectric }) => {
            return (
              <div
                style={{
                  display: withElectric ? "block" : "none",
                }}
              >
                <ProFormTextArea
                  width="md"
                  name="withElectricWorkContent"
                  label="带电作业内容"
                  className="with-electric-work-content"
                  fieldProps={{
                    autoSize: { minRows: 5 },
                  }}
                />
                <ProFormUploadButton
                  width="xl"
                  name="withElectricWorkImg"
                  label="带电作业图片"
                  max={5}
                  // set headers for upload
                  fieldProps={{
                    customRequest: async (options) => {
                      const file = options.file as any;
                      console.log(file);
                      try {
                        const res = await uploadFile(
                          file as any,
                          cos!,
                          (progress) => {
                            file.progress = Math.floor(progress.percent * 100);
                            const event = new Event("progress");
                            (event as any).percent = progress.percent * 100;
                            options.onProgress?.(event);
                          }
                        );
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
                  }}
                  action={"http://secret"}
                  listType="picture-card"
                />
              </div>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </div>
  );
};

export default App;
