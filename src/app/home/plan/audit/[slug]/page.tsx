"use client";
import React, { useEffect, useState } from "react";
import { Divider, message, Table } from "antd";
import axios from "axios";
import {
  PageLoading,
  ProForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import {
  EPerson,
  EPersonData,
  EPlan,
  EPlanStatusEnum,
  ESection,
  EUser,
} from "@dtos/db";
import { useServerConfigs } from "@utils/hooks";
import { IPlanDetailRes } from "@dtos/api";
import { Footers, ImgsFormItem } from "./help";
import { WithElectricOptions } from "@constants/options";
import { useRouter } from "next/navigation";
import { commonTextareaProps } from "../../upload/help";

const App: React.FC<{ params: { slug: string } }> = (props) => {
  const {
    params: { slug },
  } = props;

  const [detail, setDetail] = useState<IPlanDetailRes>();
  const router = useRouter();
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

  if (!optionsRes || !detail) return <PageLoading />;

  const {
    workOwnerOptions,
    workerOptions,
    specialWorkerOptions,
    operatorOptions,
    maintainerOptions,
  } = optionsRes;

  const { sections, people, plan } = detail;

  return (
    <div>
      <ProForm
        layout="horizontal"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 14 }}
        initialValues={{
          ...plan,
          [EPlan.OneStopMultiUseImgs.Name]:
            "https://cjxt-1325833079.cos.ap-nanjing.myqcloud.com/up/2024-05-04/KgLvPwcPUz1pmo-UdpTc4.png,https://cjxt-1325833079.cos.ap-nanjing.myqcloud.com/up/2024-05-04/F92m-kp0EtCOkowFYUefZ.jpg,https://cjxt-1325833079.cos.ap-nanjing.myqcloud.com/up/2024-05-04/43CjegLDgo119umPhh4Gp.jpg".split(
              ","
            ),
        }}
        submitter={{
          render: (_, dom) => (
            <Footers
              id={slug}
              onSuccess={() => {
                if (process.env.NODE_ENV === "production") {
                  router.push("/home/plan/search");
                }
              }}
            />
          ),
        }}
      >
        <Divider orientation="left">
          <h2>项目必要性</h2>
        </Divider>
        <>
          <ImgsFormItem
            label={EPlan.PlanSourceImgs.label}
            value={plan[EPlan.PlanSourceImgs.Name]}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.PlanSourceText.Name}
            label={EPlan.PlanSourceText.label}
            readonly
          />
          <ImgsFormItem
            label={EPlan.OneStopMultiUseImgs.label}
            value={plan[EPlan.OneStopMultiUseImgs.Name]}
          />
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.OneStopMultiUseText.Name}
            label={EPlan.OneStopMultiUseText.label}
            readonly
          />
          <ImgsFormItem
            label={EPlan.MetricsImprovementImgs.label}
            value={plan[EPlan.MetricsImprovementImgs.Name]}
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
                    value={plan[EPlan.WithElectricWorkImgs.Name]}
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
            value={plan[EPlan.PowerOutageHomesImgs.Name]}
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
            {people && people.length > 0 ? (
              <Table
                bordered
                dataSource={people}
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
                  {
                    title: EPersonData.SectionId.Label,
                    width: 100,
                    dataIndex: EPersonData.SectionId.Name,
                    key: EPersonData.SectionId.Name,
                    render: (text) => {
                      return (
                        sections.find(
                          (section) => section[ESection.ID] === text
                        )?.[ESection.Name] ?? "-"
                      );
                    },
                  },
                ]}
              />
            ) : (
              "-"
            )}
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
            value={plan[EPlan.BirdsEye.Name]}
          />
          <ProFormTextArea
            readonly
            name={EPlan.HighRiskPlaceText.Name}
            label={EPlan.HighRiskPlaceText.label}
            {...commonTextareaProps}
          />
          <ImgsFormItem
            label={EPlan.HighRiskPlaceImgs.label}
            value={plan[EPlan.HighRiskPlaceImgs.Name]}
          />
          <ImgsFormItem
            label={EPlan.Overview.label}
            value={plan[EPlan.Overview.Name]}
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
            value={plan[EPlan.VerificationImgs.Name]}
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
            value={plan[EPlan.EquipmentAllocation.Name]}
            label={EPlan.EquipmentAllocation.label}
          />
          <ImgsFormItem
            value={plan[EPlan.MaterialAllocation.Name]}
            label={EPlan.MaterialAllocation.label}
          />
        </>
      </ProForm>
    </div>
  );
};

export default App;
