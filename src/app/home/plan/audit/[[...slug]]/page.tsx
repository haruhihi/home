"use client";
import React, { useEffect, useState } from "react";
import { Divider, message, Table } from "antd";
import {
  PageLoading,
  ProForm,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { EPersonData, EPlan, ESection } from "@dtos/db";
import { DataTimeRangePickerFormItem, Footers, ImgsFormItem } from "./help";
import { WithElectricOptions } from "@constants/options";
import { useRouter } from "next/navigation";
import { commonTextareaProps } from "../../upload/help";
import { usePlanDetail } from "@utils/detail-plan-provider";
import { ERoute } from "@constants/route";
import { TIME_RANGE_SEPARATOR } from "@constants/config";
import { FrequentPowerCutTable } from "./components/frequent-power-cut-table";
import { RiskUsersTable } from "./components/risk-users-table";

const App: React.FC<{ params: { slug: string } }> = (props) => {
  const router = useRouter();
  // const optionsRes = useServerConfigs();
  const { detail } = usePlanDetail();

  const {
    params: { slug },
  } = props;

  if (!slug || slug.length === 0) {
    router.replace("/home/plan/search");
    return null;
  }

  if (slug.length === 1) {
    // console.log(`${ERoute.PlanSource}/${slug[0]}`);
    router.replace(`${ERoute.PlanSource}/${slug[0]}`);
    return null;
  }

  const [part, id] = slug;
  const mathPath = `/home/plan/audit/${part}`;

  if (!detail) return <PageLoading />;
  const { sections, people, plan } = detail;

  const route2Plan = {
    [ERoute.PlanSource]: (
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
      </>
    ),
    [ERoute.OneStopMultiUse]: (
      <>
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
      </>
    ),
    [ERoute.MetricsImprovement]: (
      <>
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
    ),
    [ERoute.LoadStop]: (
      <>
        <ProFormTextArea
          name={EPlan.LoadStop.Name}
          label={EPlan.LoadStop.label}
          {...commonTextareaProps}
          readonly
        />
      </>
    ),
    [ERoute.WithElectricity]: (
      <>
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
                <DataTimeRangePickerFormItem
                  value={plan[EPlan.WithElectricWorkTimeRange.Name]}
                  label={EPlan.WithElectricWorkTimeRange.label}
                />
                <DataTimeRangePickerFormItem
                  value={plan[EPlan.WithElectricWorkTimeRange2.Name]}
                  label={EPlan.WithElectricWorkTimeRange2.label}
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
    ),
    [ERoute.PowerCutHouseholds]: (
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
      </>
    ),
    [ERoute.FrequentPowerCut]: (
      <>
        <ProForm.Item label={"频繁停电"}>
          <FrequentPowerCutTable />
        </ProForm.Item>
      </>
    ),
    [ERoute.RiskUsers]: (
      <>
        <ProForm.Item label={"敏感用户"}>
          <RiskUsersTable />
        </ProForm.Item>
      </>
    ),
    [ERoute.ServicePlan]: (
      <>
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
      </>
    ),
    [ERoute.Qualification]: <>{"人员资质"}</>,
    [ERoute.ConstructionPic]: (
      <>
        <ImgsFormItem
          label={EPlan.BirdsEye.label}
          value={plan[EPlan.BirdsEye.Name]}
        />
      </>
    ),
    [ERoute.HighRiskPlace]: (
      <>
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
      </>
    ),
    [ERoute.OnSiteInfo]: (
      <>
        <ImgsFormItem
          label={EPlan.Overview.label}
          value={plan[EPlan.Overview.Name]}
        />
      </>
    ),
    [ERoute.OnSitePic]: (
      <>
        <ImgsFormItem
          label={EPlan.Overview.label}
          value={plan[EPlan.Overview.Name]}
        />
      </>
    ),
    [ERoute.DateAndSource]: (
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
        <DataTimeRangePickerFormItem
          value={plan[EPlan.WithElectricWorkTimeRange.Name]}
          label={EPlan.WithElectricWorkTimeRange.label}
        />
        <DataTimeRangePickerFormItem
          value={plan[EPlan.WithElectricWorkTimeRange2.Name]}
          label={EPlan.WithElectricWorkTimeRange2.label}
        />
        <ProFormTextArea
          readonly
          {...commonTextareaProps}
          name={EPlan.OnSiteWork.Name}
          label={EPlan.OnSiteWork.label}
        />
      </>
    ),
    [ERoute.Review]: (
      <>
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
    ),
    [ERoute.EquipmentAllocation]: (
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
      </>
    ),
    [ERoute.MaterialAllocation]: (
      <>
        <ImgsFormItem
          value={plan[EPlan.MaterialAllocation.Name]}
          label={EPlan.MaterialAllocation.label}
        />
      </>
    ),
  };

  return (
    <ProForm
      layout="vertical"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 14 }}
      initialValues={{
        ...plan,
      }}
      submitter={{
        render: (_, dom) => (
          <Footers
            id={id}
            onSuccess={() => {
              if (process.env.NODE_ENV === "production") {
                router.push("/home/plan/search");
              }
            }}
          />
        ),
      }}
    >
      {(route2Plan as any)[mathPath] ?? "----"}
    </ProForm>
  );
};

export default App;
