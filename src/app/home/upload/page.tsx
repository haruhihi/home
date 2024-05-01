"use client";
import React, { useEffect, useState } from "react";
import { Divider, Image, message } from "antd";
import axios from "axios";
import COS from "cos-js-sdk-v5";
import {
  FooterToolbar,
  ProForm,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormUploadButtonProps,
} from "@ant-design/pro-components";
import { maintainTeamOptions, operationTeamOptions } from "./help";
import { uploadFileToCOS } from "./upload-file";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { EPlan } from "@dtos/db";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC = () => {
  const [cos, setCOS] = useState<COS>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const commonUploadProps: Partial<ProFormUploadButtonProps> = {
    // onPreview: handlePreview,
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
    max: 5,
  };

  const commonTextareaProps = {
    width: "md" as const,
    fieldProps: {
      autoSize: { minRows: 5 },
    },
  };

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
        initialValues={{
          withElectric: true,
          [EPlan.ServicePlan]: "不需要",
          [EPlan.LoadStop]: false,
        }}
        onFinish={(values) => {
          console.log("values", values);
        }}
        submitter={{
          render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
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
        />
        <ProFormSelect
          name="operationTeam"
          options={operationTeamOptions}
          label="施工单位"
          width="md"
        />
        <ProFormSelect
          width="md"
          name="maintainPerson"
          label="工作负责人"
          options={operatorOptions}
          mode="multiple"
        />
        <ProFormSelect
          width="md"
          name="operationPerson"
          label="施工人员"
          options={operatorOptions}
          mode="multiple"
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
        />
        <ProFormSelect
          width="md"
          name="specificArea"
          label="专业分类"
          options={specificAreaOptions}
        />
        <ProFormSelect
          width="md"
          name="riskLevel"
          label="作业风险等级"
          options={riskLevelOptions}
        />
        <ProFormSelect
          width="md"
          name="electricRiskLevel"
          label="电网风险等级"
          options={electricRiskLevelOptions}
        />
        <ProFormTextArea
          name="workContent"
          label="作业内容"
          {...commonTextareaProps}
        />
        <ProFormSwitch label="带电作业" width="md" name="withElectric" />
        <ProFormDependency name={["withElectric"]}>
          {({ withElectric }) => {
            return (
              <div
                style={{
                  display: withElectric ? "block" : "none",
                }}
              >
                <ProFormDateTimePicker label="带电作业开始时间" />
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
                  {...commonUploadProps}
                />
                <ProFormUploadButton
                  width="xl"
                  name="withElectricWorkImg"
                  label="风险防范"
                  tooltip={
                    <ul>
                      {[
                        "1、上传现勘、施工方案、工作票（word文档） ",
                        "2、上传施工附图、鸟瞰图(图片)",
                        "3、高风险作业点（文字+图片）",
                      ].map((item) => {
                        return <li key={item}>{item}</li>;
                      })}
                    </ul>
                  }
                  {...commonUploadProps}
                />
              </div>
            );
          }}
        </ProFormDependency>
        <Divider orientation="left">
          <h2>负荷停用情况</h2>
        </Divider>
        <>
          <ProFormTextArea
            tooltip="停用方式"
            {...commonTextareaProps}
            label="负荷停用"
          />
          <ProFormSwitch
            tooltip="停用方式"
            label="负荷转供"
            name={EPlan.LoadStop}
          />
          <ProFormDependency name={[EPlan.LoadStop]}>
            {(values) => {
              return (
                <div
                  style={{
                    display: values[EPlan.LoadStop] ? "block" : "none",
                  }}
                >
                  <ProFormTextArea
                    {...commonTextareaProps}
                    label="负荷转供内容"
                  />
                </div>
              );
            }}
          </ProFormDependency>
          <ProFormSwitch label="操巡队开关是否到位" />
          <ProFormTextArea {...commonTextareaProps} label="停电方式及区域" />
        </>
        <Divider orientation="left">
          <h2>作业时间</h2>
        </Divider>
        <>
          <ProFormDateTimePicker label="计划完工时间" />
          <ProFormDateTimePicker label="负荷停用时间" />
        </>
        <Divider orientation="left">
          <h2>项目必要性</h2>
        </Divider>
        <>
          <ProFormUploadButton {...commonUploadProps} label="计划来源（图）" />
          <ProFormTextArea {...commonTextareaProps} label="计划来源（文）" />
          <ProFormUploadButton {...commonUploadProps} label="一停多用（图）" />
          <ProFormTextArea {...commonTextareaProps} label="一停多用（文）" />
          <ProFormUploadButton
            {...commonUploadProps}
            label="指标提升情况（图）"
          />
          <ProFormTextArea
            {...commonTextareaProps}
            label="指标提升情况（文）"
          />
        </>
        <Divider orientation="left">
          <h2>供电可靠性</h2>
        </Divider>
        <>
          <ProFormUploadButton
            {...commonUploadProps}
            label="停电时户数（图）"
          />
          <ProFormTextArea {...commonTextareaProps} label="停电时户数（文）" />
          <ProFormRadio.Group
            options={["需要", "不需要"]}
            label="服务方案"
            name={EPlan.ServicePlan}
          />
          <ProFormDependency name={[EPlan.ServicePlan]}>
            {(values) => {
              return (
                <div
                  style={{
                    display:
                      values[EPlan.ServicePlan] === "需要" ? "block" : "none",
                  }}
                >
                  <ProFormUploadButton
                    {...commonUploadProps}
                    label="服务方案（文档）"
                  />
                  <ProFormTextArea
                    {...commonTextareaProps}
                    label="服务方案（文）"
                  />
                </div>
              );
            }}
          </ProFormDependency>
        </>

        <Divider orientation="left">
          <h2>其他</h2>
        </Divider>
        <>
          <ProFormUploadButton
            {...commonUploadProps}
            label="物资"
            tooltip="上传设备异动单、物资调拨单、编号"
          />
          <ProFormTextArea label="现场作业组织" {...commonTextareaProps} />
        </>
      </ProForm>
      {previewImage && (
        <Image
          alt="预览"
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default App;
