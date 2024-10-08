"use client";
import React, { useState } from "react";
import { Button, Divider, Form, List, message, Modal } from "antd";
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
import SpecialWorkersModal from "./special-workers-modal";
import GaodeWeather from "@components/gaode-weather";
import { RiskUsers } from "@components/risk-users";
import { FrequentPowerCut } from "@components/frequent-power-cut";
import { getPowerOutageHomesV2 } from "../audit/[[...slug]]/help";
import axios from "axios";
const CITY = 420881 // 钟祥市


const App: React.FC = () => {
  const [form] = ProForm.useForm();
  const optionsRes = useServerConfigs();
  const [imgUrls, setImgUrls] = useState([])
  const router = useRouter();
  const { commonUploadProps } = useUpload();

  const getTexts = (text: string) => {
    try {
      // 正则表达式匹配 "带电作业工作地点" 和其后的内容，处理冒号前后的空白字符
    const data = text.split('\n').find(v => v.includes('带电作业工作地点')) || '';
    console.log('data',data);
    
    const content = data.split('带电作业工作地点:')[1] || data.split('带电作业工作地点：')[1];
    
    if (content) {
      // 按照中英文逗号分隔，处理逗号前后的空白字符和换行
      const items = content.split(/[\s]*[,，][\s]*/).map(item => item.trim()).filter(item => item.length > 0);
      return items;
    } else {
      console.log('未找到匹配的内容');
      return []
    }
    } catch (error) {
      message.error('请按要求的格式输入');
      return []
    }
  }

  const checkImgText = async () => {
    try {
      // 调用文字识别接口 imgUrls
     const promises = imgUrls.map(imageUrl => {
       return axios.post(
         "/home/api/ocr",
         {imageUrl}
       );
     });
 
     const ocrResults = await Promise.allSettled(promises)
 
     const finalDetectedTexts = ocrResults.filter(ocrResult => ocrResult && ocrResult.status === 'fulfilled' &&  ocrResult?.value?.data?.result?.TextDetections).map((r:any) => {
       console.log('r',r)
       const detectedTexts = r?.value?.data?.result?.TextDetections?.map((v:any) => v.DetectedText);
       if (detectedTexts && detectedTexts.length > 0) {
         return detectedTexts.join('').trim();
      } else {
       return '';
      }
     });
     console.log("finalDetectedTexts", finalDetectedTexts)
     const withElectricWorkText = form.getFieldValue(EPlan.WithElectricWorkText.Name) || "";
     console.log("withElectricWorkText", withElectricWorkText)
     const checkRes = getTexts(withElectricWorkText);
     console.log('checkRes', checkRes);
     function arraysEqualUnordered(arr1: string[], arr2: string[]) { 
      // arr1 图片 arr2 文本
      // 检查数组长度是否相同
      if (arr1.length !== arr2.length) return false;
      return arr2.every(v => arr1.find(j => j.includes(v))) && arr1.every(v => arr2.find(j =>v.includes(j)))
     
    }

     if (!arraysEqualUnordered(finalDetectedTexts, checkRes)) {
       Modal.error({
         title:'校验失败',
         content: <div>
          <List dataSource={checkRes} header='文本内容' renderItem={(item) => <List.Item>{item}</List.Item>} bordered />
           
          <List dataSource={finalDetectedTexts} header='图片内容' renderItem={(item) => <List.Item>{item}</List.Item>} bordered style={{ marginTop: 8 }}/>
         </div>
       })
     } else {
       Modal.success({
         title:'校验通过',
         content: <div>
         <p>文本内容与图片内容一致</p>
         <List header='带电作业工作地点' dataSource={checkRes}  renderItem={(item) => <List.Item>{item}</List.Item>} bordered/>
         </div>
       })
     }
    } catch(err) {
      console.log(err)
    }
    
  }

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
        }}
        form={form}
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
        onValuesChange={(values) => {
          const name = Object.keys(values)[0];
          if (name === EPlan.WithElectricWorkImgs.Name) {
            const imgUrls = values[EPlan.WithElectricWorkImgs.Name].map((v: any) => v.url);
            console.log(99, imgUrls);
            setImgUrls(imgUrls);
          }
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
        <SpecialWorkersModal form={form} specialWorkerOptions={specialWorkerOptions} />
       
        <Divider orientation="left">
          <h2>工作内容</h2>
        </Divider>
        <ProFormSelect
          width="md"
          label={EPlan.VoltageLevel.label}
          name={EPlan.VoltageLevel.Name}
          options={voltageLevelOptions}
        />
        <SectionFormItem extra={
          <>
            <Button style={{ marginLeft:-15 }}  type="link" onClick={() => { Modal.info({
              title: '敏感用户',
              content: <div><RiskUsers sectionIds={form.getFieldValue(EPlan.Section.Name)} /></div>,
              width: 1200
            }) }}>校验敏感用户</Button>

            <Button style={{ marginLeft:-15 }}  type="link" onClick={() => {  Modal.info({
              title: '频繁停电',
              content: <div><FrequentPowerCut sectionIds={form.getFieldValue(EPlan.Section.Name)} /></div>,
              width: 1200
            }) }} >校验频繁停电</Button>

            <Button style={{ marginLeft:-15 }}  type="link" onClick={() => { 
              Modal.info({
              title: '停电时户数',
              content: <div>{getPowerOutageHomesV2({
                expectFinish: form.getFieldValue(EPlan.ExpectFinishAt.Name),
                expectStart: form.getFieldValue(EPlan.ExpectStartAt.Name),
                sectionNum: form.getFieldValue(EPlan.Section.Name)?.length
              })}</div>
            }) }}>校验停电时户数</Button>
          </>
        } />
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
            extra={<Button onClick={checkImgText} type="link">校验</Button>}
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
          <Form.Item shouldUpdate noStyle>{(form) => {
            return <ProFormDateTimePicker
              name={EPlan.ExpectStartAt.Name}
              label={EPlan.ExpectStartAt.label}
              addonAfter=  {<GaodeWeather city={CITY} date={form.getFieldValue(EPlan.ExpectStartAt.Name)?.format("YYYY-MM-DD")}
            />}
          />
          }}</Form.Item>
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
