"use client";
import React, { useEffect, useState } from "react";
import { Divider, Image, message } from "antd";
import axios from "axios";
import COS from "cos-js-sdk-v5";
import {
  PageLoading,
  ProForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormUploadButtonProps,
} from "@ant-design/pro-components";
import { uploadFileToCOS } from "./upload-file";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { EPlan } from "@dtos/db";
import { Footer } from "./footer";
import { useServerConfigs } from "@utils/hooks";

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
  const optionsRes = useServerConfigs();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

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
    max: 5,
  };

  const commonTextareaProps = {
    width: "md" as const,
    fieldProps: {
      autoSize: { minRows: 5 },
    },
  };

  const specificAreaOptions = ["配电", "营销", "设备", "产业"];

  const riskLevelOptions = ["一级", "二级", "三级", "四级", "五级"];

  const electricRiskLevelOptions = ["四级", "五级", "六级", "七级", "八级"];

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

  if (!optionsRes) return <PageLoading />;
  console.log("optionsRes", optionsRes);
  const {
    workOwnerOptions,
    workerOptions,
    specialWorkerOptions,
    operatorOptions,
    maintainerOptions,
    sectionOptions,
  } = optionsRes;
  return (
    <div>
      <ProForm
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={{
          withElectric: true,
          // [EPlan.ServicePlan]: "不需要",
          // [EPlan.LoadStop]: false,
        }}
        onFinish={(values) => {
          console.log(values);
          axios
            .post(
              "/home/api/plan/create",
              Object.keys(values).reduce((acc, key) => {
                const value = values[key];
                if (
                  Array.isArray(value) &&
                  value.some(
                    (item) => item && item.originFileObj instanceof File
                  )
                ) {
                  return { ...acc, [key]: value.map((item) => item.url) };
                }
                return { ...acc, [key]: value };
              }, {})
            )
            .then((res) => {
              message.success("创建成功");
            })
            .catch((err) => {
              message.error(err.message ?? "创建失败");
              console.log(err);
            });
        }}
        submitter={{
          render: (_, dom) => <Footer ele={dom}></Footer>,
        }}
      >
        <Divider orientation="left">
          <h2>单位及人员</h2>
        </Divider>

        <ProFormSelect
          name={EPlan.Maintainer.Name}
          options={maintainerOptions}
          width="md"
          label={EPlan.Maintainer.label}
        />
        <ProFormSelect
          name={EPlan.Operator.Name}
          options={operatorOptions}
          label={EPlan.Operator.label}
          width="md"
        />
        <ProFormSelect
          width="md"
          name={EPlan.WorkOwners.Name}
          label={EPlan.WorkOwners.label}
          options={workOwnerOptions}
          mode="multiple"
        />
        <ProFormSelect
          width="md"
          name={EPlan.Workers.Name}
          label={EPlan.Workers.label}
          options={workerOptions}
          mode="multiple"
        />
        <ProFormSelect
          width="md"
          name={EPlan.SpecialWorkers.Name}
          label={EPlan.SpecialWorkers.label}
          options={specialWorkerOptions}
          mode="multiple"
        />
        <Divider orientation="left">
          <h2>工作内容</h2>
        </Divider>
        <ProFormSelect
          width="md"
          label={EPlan.VoltageLevel.label}
          name={EPlan.VoltageLevel.Name}
          options={["35kV", "10kV", "0.38kV", "0.22kV"]}
        />
        <ProFormSelect
          width="md"
          name={EPlan.Section.Name}
          label={EPlan.Section.label}
          options={sectionOptions}
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
          name={EPlan.WorkRiskLevel.Name}
          label={EPlan.WorkRiskLevel.label}
          options={riskLevelOptions}
        />
        <ProFormSelect
          width="md"
          name={EPlan.ElectricRiskLevel.Name}
          label={EPlan.ElectricRiskLevel.label}
          options={electricRiskLevelOptions}
        />
        <ProFormTextArea
          name={EPlan.WorkContent.Name}
          label={EPlan.WorkContent.label}
          {...commonTextareaProps}
        />
        <ProFormSwitch
          width="md"
          name={EPlan.WithElectric.Name}
          label={EPlan.WithElectric.label}
        />
        <ProFormDependency name={[EPlan.WithElectric.Name]}>
          {(values) => {
            return (
              <div
                style={{
                  display: values[EPlan.WithElectric.Name] ? "block" : "none",
                }}
              >
                <ProFormDateTimePicker
                  name={EPlan.WithElectricWorkStartAt.Name}
                  label={EPlan.WithElectricWorkStartAt.label}
                />
                <ProFormTextArea
                  name={EPlan.WithElectricWorkText.Name}
                  label={EPlan.WithElectricWorkText.label}
                  {...commonTextareaProps}
                />
                <ProFormUploadButton
                  name={EPlan.WithElectricWorkImgs.Name}
                  label={EPlan.WithElectricWorkImgs.label}
                  {...commonUploadProps}
                />
              </div>
            );
          }}
        </ProFormDependency>
        <ProFormSwitch
          width="md"
          name={EPlan.PowerCut.Name}
          label={EPlan.PowerCut.label}
        />
        <ProFormTextArea
          name={EPlan.VerificationText.Name}
          label={EPlan.VerificationText.label}
          {...commonTextareaProps}
        />
        <ProFormUploadButton
          name={EPlan.VerificationImgs.Name}
          label={EPlan.VerificationImgs.label}
          {...commonUploadProps}
        />
        <Divider orientation="left">
          <h2>风险防范</h2>
        </Divider>
        <>
          <ProFormUploadButton
            width="xl"
            name={EPlan.Overview.Name}
            label={EPlan.Overview.label}
            {...commonUploadProps}
          />
          <ProFormUploadButton
            width="xl"
            name={EPlan.BirdsEye.Name}
            label={EPlan.BirdsEye.label}
            {...commonUploadProps}
          />
          <ProFormTextArea
            name={EPlan.HighRiskPlaceText.Name}
            label={EPlan.HighRiskPlaceText.label}
            {...commonTextareaProps}
          />
          <ProFormUploadButton
            name={EPlan.HighRiskPlaceImgs.Name}
            label={EPlan.HighRiskPlaceImgs.label}
            {...commonUploadProps}
          />
        </>
        <Divider orientation="left">
          <h2>负荷停用情况</h2>
        </Divider>
        <>
          <ProFormTextArea
            name={EPlan.LoadStop.Name}
            label={EPlan.LoadStop.label}
            {...commonTextareaProps}
          />
          <ProFormSwitch
            name={EPlan.LoadShifting.Name}
            label={EPlan.LoadShifting.label}
          />
          <ProFormDependency name={[EPlan.LoadShifting.Name]}>
            {(values) => {
              return (
                <div
                  style={{
                    display: values[EPlan.LoadShifting.Name] ? "block" : "none",
                  }}
                >
                  <ProFormTextArea
                    name={EPlan.EquipmentCondition.Name}
                    label={EPlan.EquipmentCondition.label}
                    {...commonTextareaProps}
                  />
                </div>
              );
            }}
          </ProFormDependency>
          <ProFormSwitch
            name={EPlan.PatrolSwitch.Name}
            label={EPlan.PatrolSwitch.label}
          />
          <ProFormRadio.Group
            name={EPlan.PowerOutMethod.Name}
            label={EPlan.PowerOutMethod.label}
            options={["停用开关", "带电作业"]}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.PowerOutPlace.Name}
            label={EPlan.PowerOutPlace.label}
          />
        </>
        <Divider orientation="left">
          <h2>作业时间</h2>
        </Divider>
        <>
          <ProFormDateTimePicker
            name={EPlan.ExpectStartAt.Name}
            label={EPlan.ExpectStartAt.label}
          />
          <ProFormDateTimePicker
            name={EPlan.ExpectFinishAt.Name}
            label={EPlan.ExpectFinishAt.label}
          />
          <ProFormDateTimePicker
            name={EPlan.LoadStopAt.Name}
            label={EPlan.LoadStopAt.label}
          />
        </>
        <Divider orientation="left">
          <h2>项目必要性</h2>
        </Divider>
        <>
          <ProFormUploadButton
            {...commonUploadProps}
            name={EPlan.PlanSourceImgs.Name}
            label={EPlan.PlanSourceImgs.label}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.PlanSourceText.Name}
            label={EPlan.PlanSourceText.label}
          />
          <ProFormUploadButton
            {...commonUploadProps}
            name={EPlan.OneStopMultiUseImgs.Name}
            label={EPlan.OneStopMultiUseImgs.label}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.OneStopMultiUseText.Name}
            label={EPlan.OneStopMultiUseText.label}
          />
          <ProFormUploadButton
            {...commonUploadProps}
            name={EPlan.MetricsImprovementImgs.Name}
            label={EPlan.MetricsImprovementImgs.label}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.MetricsImprovementText.Name}
            label={EPlan.MetricsImprovementText.label}
          />
        </>
        <Divider orientation="left">
          <h2>供电可靠性</h2>
        </Divider>
        <>
          <ProFormUploadButton
            {...commonUploadProps}
            name={EPlan.PowerOutageHomesImgs.Name}
            label={EPlan.PowerOutageHomesImgs.label}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.PowerOutageHomesText.Name}
            label={EPlan.PowerOutageHomesText.label}
          />
          <ProFormRadio.Group
            name={EPlan.ServicePlan.Name}
            label={EPlan.ServicePlan.label}
            options={["需要", "不需要"]}
          />
          <ProFormDependency name={[EPlan.ServicePlan.Name]}>
            {(values) => {
              return (
                <div
                  style={{
                    display:
                      values[EPlan.ServicePlan.Name] === "需要"
                        ? "block"
                        : "none",
                  }}
                >
                  {/* <ProFormUploadButton
                    {...commonUploadProps}
                    name={EPlan.ServicePlanContent.Name}
                    label={EPlan.ServicePlanContent.label}
                  /> */}
                  <ProFormTextArea
                    {...commonTextareaProps}
                    name={EPlan.ServicePlanContent.Name}
                    label={EPlan.ServicePlanContent.label}
                  />
                </div>
              );
            }}
          </ProFormDependency>
        </>

        <Divider orientation="left">
          <h2>物资</h2>
        </Divider>
        <>
          <ProFormText
            label={EPlan.EquipmentAllocationId.label}
            {...commonTextareaProps}
            name={EPlan.EquipmentAllocationId.Name}
          />
          <ProFormUploadButton
            name={EPlan.EquipmentAllocation.Name}
            label={EPlan.EquipmentAllocation.label}
            {...commonUploadProps}
          />
          <ProFormUploadButton
            name={EPlan.MaterialAllocation.Name}
            label={EPlan.MaterialAllocation.label}
            {...commonUploadProps}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.OnSiteWork.Name}
            label={EPlan.OnSiteWork.label}
          />
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
