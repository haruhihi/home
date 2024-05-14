"use client";
import React from "react";
import { Divider } from "antd";
import {
  PageLoading,
  ProForm,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { EPlan } from "@dtos/db";
import { Footer } from "@components/footer-client";
import { useServerConfigs } from "@utils/hooks";
import { SectionFormItem } from "@components/section-form-item";
import {
  LoadShiftingOptionEnum,
  LoadShiftingOptions,
  PatrolSwitchEnum,
  PatrolSwitchOptions,
  PowerCutOptionEnum,
  PowerCutOptions,
  PowerOutMethodEnum,
  PowerOutMethodOptions,
  ServicePlanEnum,
  ServicePlanOptions,
  WithElectricOptionEnum,
  WithElectricOptions,
  electricRiskLevelOptions,
  riskLevelOptions,
  specificAreaOptions,
  voltageLevelOptions,
} from "@constants/options";
import { useUpload } from "@utils/use-upload";
import { Dependence, commonTextareaProps, onFinish } from "./help";
import { useRouter } from "next/navigation";

const App: React.FC = () => {
  const optionsRes = useServerConfigs();
  const router = useRouter();
  const { commonUploadProps } = useUpload();

  if (!optionsRes) return <PageLoading />;

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
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={{
          [EPlan.WithElectric.Name]: WithElectricOptionEnum.Yes,
          [EPlan.PowerCut.Name]: PowerCutOptionEnum.Yes,
          [EPlan.LoadShifting.Name]: LoadShiftingOptionEnum.Yes,
          [EPlan.PatrolSwitch.Name]: PatrolSwitchEnum.Yes,
          [EPlan.PowerOutMethod.Name]: PowerOutMethodEnum.CutOff,
          [EPlan.ServicePlan.Name]: ServicePlanEnum.Yes,
        }}
        onFinish={async (values) => {
          await onFinish({
            values,
            onClose: () => {
              if (process.env.NODE_ENV === "production") {
                router.push("/home/plan/search");
              }
            },
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
          options={voltageLevelOptions}
        />
        <SectionFormItem />
        <ProFormSelect
          width="md"
          name={EPlan.Classification.Name}
          label={EPlan.Classification.label}
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
        <ProFormRadio.Group
          width="md"
          options={WithElectricOptions}
          name={EPlan.WithElectric.Name}
          label={EPlan.WithElectric.label}
        />
        <Dependence
          dependOn={EPlan.WithElectric.Name}
          equals={WithElectricOptionEnum.Yes}
        >
          <ProFormDateTimeRangePicker
            name={EPlan.WithElectricWorkTimeRange.Name}
            label={EPlan.WithElectricWorkTimeRange.label}
          />
          <ProFormDateTimeRangePicker
            name={EPlan.WithElectricWorkTimeRange2.Name}
            label={EPlan.WithElectricWorkTimeRange2.label}
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
        </Dependence>
        <ProFormRadio.Group
          width="md"
          name={EPlan.PowerCut.Name}
          label={EPlan.PowerCut.label}
          options={PowerCutOptions}
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
          <ProFormRadio.Group
            name={EPlan.LoadShifting.Name}
            label={EPlan.LoadShifting.label}
            options={LoadShiftingOptions}
          />

          <Dependence
            dependOn={EPlan.LoadShifting.Name}
            equals={LoadShiftingOptionEnum.Yes}
          >
            <ProFormTextArea
              name={EPlan.EquipmentCondition.Name}
              label={EPlan.EquipmentCondition.label}
              {...commonTextareaProps}
            />
            <ProFormRadio.Group
              name={EPlan.PatrolSwitch.Name}
              label={EPlan.PatrolSwitch.label}
              options={PatrolSwitchOptions}
            />
          </Dependence>

          <ProFormRadio.Group
            name={EPlan.PowerOutMethod.Name}
            label={EPlan.PowerOutMethod.label}
            options={PowerOutMethodOptions}
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
          {/* <ProFormDateTimePicker
            name={EPlan.LoadStopAt.Name}
            label={EPlan.LoadStopAt.label}
          /> */}
          <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.OnSiteWork.Name}
            label={EPlan.OnSiteWork.label}
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
          {/* <ProFormTextArea
            {...commonTextareaProps}
            name={EPlan.PowerOutageHomesText.Name}
            label={EPlan.PowerOutageHomesText.label}
          /> */}
          <ProFormRadio.Group
            name={EPlan.ServicePlan.Name}
            label={EPlan.ServicePlan.label}
            options={ServicePlanOptions}
          />
          <Dependence
            dependOn={EPlan.ServicePlan.Name}
            equals={ServicePlanEnum.Yes}
          >
            <ProFormTextArea
              {...commonTextareaProps}
              name={EPlan.ServicePlanContent.Name}
              label={EPlan.ServicePlanContent.label}
            />
          </Dependence>
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
        </>
      </ProForm>
    </div>
  );
};

export default App;
