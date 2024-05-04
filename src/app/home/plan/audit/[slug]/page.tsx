"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Image,
  Modal,
  message,
  Space,
  List,
  Avatar,
  Table,
} from "antd";
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
import type { GetProp, UploadFile, UploadProps } from "antd";
import { EPerson, EPersonData, EPlan, EPlanStatusEnum, EUser } from "@dtos/db";
import { Footer } from "@components/footer-client";
import { useServerConfigs } from "@utils/hooks";
import { IPlanDetailRes, TOptions } from "@dtos/api";
import { Footers, ImgsFormItem } from "./help";
import { WithElectricOptions } from "@constants/options";
import { UserOutlined } from "@ant-design/icons";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC<{ params: { slug: string } }> = (props) => {
  const {
    params: { slug },
  } = props;

  const [detail, setDetail] = useState<IPlanDetailRes>();
  const optionsRes = useServerConfigs();

  useEffect(() => {
    axios
      .post("/home/api/plan/detail", { id: slug })
      .then((res) => {
        setDetail(res.data.result);
      })
      .catch((err) => {
        message.error(err.message ?? "查询失败");
      });
  }, [slug]);

  const commonTextareaProps = {
    width: "md" as const,
    fieldProps: {
      autoSize: { minRows: 5 },
    },
  };

  const specificAreaOptions = ["配电", "营销", "设备", "产业"];

  const riskLevelOptions = ["一级", "二级", "三级", "四级", "五级"];

  const electricRiskLevelOptions = ["四级", "五级", "六级", "七级", "八级"];

  if (!optionsRes || !detail) return <PageLoading />;
  console.log("optionsRes", optionsRes);
  const {
    workOwnerOptions,
    workerOptions,
    specialWorkerOptions,
    operatorOptions,
    maintainerOptions,
  } = optionsRes;
  return (
    <div>
      <ProForm
        layout="horizontal"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 14 }}
        initialValues={{
          ...detail.plan,
          [EPlan.OneStopMultiUseImgs.Name]:
            "https://cjxt-1325833079.cos.ap-nanjing.myqcloud.com/up/2024-05-04/KgLvPwcPUz1pmo-UdpTc4.png,https://cjxt-1325833079.cos.ap-nanjing.myqcloud.com/up/2024-05-04/F92m-kp0EtCOkowFYUefZ.jpg,https://cjxt-1325833079.cos.ap-nanjing.myqcloud.com/up/2024-05-04/43CjegLDgo119umPhh4Gp.jpg".split(
              ","
            ),
        }}
        submitter={{
          render: (_, dom) => <Footers id={slug} />,
        }}
      >
        <Divider orientation="left">
          <h2>项目必要性</h2>
        </Divider>
        <>
          <ImgsFormItem
            label={EPlan.PlanSourceImgs.label}
            value={detail.plan[EPlan.PlanSourceImgs.Name]}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.PlanSourceText.Name}
            label={EPlan.PlanSourceText.label}
            readonly
          />
          <ImgsFormItem
            label={EPlan.OneStopMultiUseImgs.label}
            value={detail.plan[EPlan.OneStopMultiUseImgs.Name]}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.OneStopMultiUseText.Name}
            label={EPlan.OneStopMultiUseText.label}
            readonly
          />
          <ImgsFormItem
            label={EPlan.MetricsImprovementImgs.label}
            value={detail.plan[EPlan.MetricsImprovementImgs.Name]}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.MetricsImprovementText.Name}
            label={EPlan.MetricsImprovementText.label}
            readonly
          />
        </>
        <Divider orientation="left">
          <h2>计划全过程</h2>
        </Divider>
        <>
          <ProFormTextArea
            name={EPlan.LoadStop.Name}
            label={EPlan.LoadStop.label}
            {...commonTextareaProps}
            readonly
          />
          <ProFormRadio.Group
            width="md"
            options={WithElectricOptions}
            name={EPlan.WithElectric.Name}
            label={EPlan.WithElectric.label}
            readonly
          />
          <ProFormDependency name={[EPlan.WithElectric.Name]}>
            {(values) => {
              return (
                <div
                  style={{
                    display:
                      values[EPlan.WithElectric.Name] === "需要"
                        ? "block"
                        : "none",
                  }}
                >
                  <ProFormDateTimePicker
                    name={EPlan.WithElectricWorkStartAt.Name}
                    label={EPlan.WithElectricWorkStartAt.label}
                    readonly
                  />
                  <ProFormTextArea
                    name={EPlan.WithElectricWorkText.Name}
                    label={EPlan.WithElectricWorkText.label}
                    {...commonTextareaProps}
                    readonly
                  />
                  <ImgsFormItem
                    label={EPlan.WithElectricWorkImgs.label}
                    value={detail.plan[EPlan.WithElectricWorkImgs.Name]}
                  />
                </div>
              );
            }}
          </ProFormDependency>
        </>
        <Divider orientation="left">
          <h2>供电可靠性</h2>
        </Divider>
        <>
          <ImgsFormItem
            label={EPlan.PowerOutageHomesImgs.label}
            value={detail.plan[EPlan.PowerOutageHomesImgs.Name]}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.PowerOutageHomesText.Name}
            label={EPlan.PowerOutageHomesText.label}
            readonly
          />
          <ProFormRadio.Group
            name={EPlan.ServicePlan.Name}
            label={EPlan.ServicePlan.label}
            options={["需要", "不需要"]}
            readonly
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
                  <ProFormTextArea
                    {...commonTextareaProps}
                    name={EPlan.ServicePlanContent.Name}
                    label={EPlan.ServicePlanContent.label}
                    readonly
                  />
                </div>
              );
            }}
          </ProFormDependency>

          <ProForm.Item label={"敏感用户"}>
            <Table
              bordered
              dataSource={detail.people}
              pagination={false}
              columns={[
                {
                  title: EPersonData.Name.Label,
                  width: 100,
                  dataIndex: EPersonData.Name.Name,
                  key: EPersonData.Name.Name,
                },
                {
                  title: EPersonData.PhoneNum.Label,
                  width: 100,
                  dataIndex: EPersonData.PhoneNum.Name,
                  key: EPersonData.PhoneNum.Name,
                },
                {
                  title: EPersonData.Risk.Label,
                  width: 100,
                  dataIndex: EPersonData.Risk.Name,
                  key: EPersonData.Risk.Name,
                },
              ]}
            />
          </ProForm.Item>
          <ProForm.Item label={"频繁停电"}>
            <div>TODO</div>
          </ProForm.Item>
        </>

        <Divider orientation="left">
          <h2>风险防范</h2>
        </Divider>
        <>
          <ImgsFormItem
            label={EPlan.BirdsEye.label}
            value={detail.plan[EPlan.BirdsEye.Name]}
          />
          <ProFormTextArea
            readonly
            name={EPlan.HighRiskPlaceText.Name}
            label={EPlan.HighRiskPlaceText.label}
            {...commonTextareaProps}
          />
          <ImgsFormItem
            label={EPlan.HighRiskPlaceImgs.label}
            value={detail.plan[EPlan.HighRiskPlaceImgs.Name]}
          />
          <ImgsFormItem
            label={EPlan.Overview.label}
            value={detail.plan[EPlan.Overview.Name]}
          />
        </>
        <Divider orientation="left">
          <h2>现场作业组织</h2>
        </Divider>
        <>
          <ProFormDateTimePicker
            readonly
            name={EPlan.ExpectStartAt.Name}
            label={EPlan.ExpectStartAt.label}
          />
          <ProFormDateTimePicker
            name={EPlan.ExpectFinishAt.Name}
            readonly
            label={EPlan.ExpectFinishAt.label}
          />
          <ProFormDateTimePicker
            readonly
            name={EPlan.LoadStopAt.Name}
            label={EPlan.LoadStopAt.label}
          />
          <ProFormDateTimePicker
            readonly
            name={EPlan.WithElectricWorkStartAt.Name}
            label={EPlan.WithElectricWorkStartAt.label}
          />
          <ProFormTextArea
            readonly
            {...commonTextareaProps}
            name={EPlan.OnSiteWork.Name}
            label={EPlan.OnSiteWork.label}
          />
          <ProFormTextArea
            readonly
            name={EPlan.VerificationText.Name}
            label={EPlan.VerificationText.label}
            {...commonTextareaProps}
          />
          <ImgsFormItem
            value={detail.plan[EPlan.VerificationImgs.Name]}
            label={EPlan.VerificationImgs.label}
          />
        </>
        <Divider orientation="left">
          <h2>物资保障</h2>
        </Divider>
        <>
          <ProFormText
            label={EPlan.EquipmentAllocationId.label}
            {...commonTextareaProps}
            name={EPlan.EquipmentAllocationId.Name}
            readonly
          />
          <ImgsFormItem
            value={detail.plan[EPlan.EquipmentAllocation.Name]}
            label={EPlan.EquipmentAllocation.label}
          />
          <ImgsFormItem
            value={detail.plan[EPlan.MaterialAllocation.Name]}
            label={EPlan.MaterialAllocation.label}
          />
        </>
      </ProForm>
    </div>
  );
};

export default App;
