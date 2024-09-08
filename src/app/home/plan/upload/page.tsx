"use client";
import React, { useState } from "react";
import { Button, Divider, Form, message, Modal } from "antd";
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

const RES = {
  "Response": {
      "Angle": 4.500009536743164,
      "Language": "zh",
      "PdfPageSize": 0,
      "RequestId": "05fdcfee-938b-431d-bf73-680a29d94a73",
      "TextDetections": [
          {
              "AdvancedInfo": "{\"Parag\":{\"ParagNo\":1}}",
              "Confidence": 100,
              "DetectedText": "10kV丽山线",
              "ItemPolygon": {
                  "Height": 39,
                  "Width": 179,
                  "X": 544,
                  "Y": 1314
              },
              "Polygon": [
                  {
                      "X": 445,
                      "Y": 1268
                  },
                  {
                      "X": 624,
                      "Y": 1280
                  },
                  {
                      "X": 621,
                      "Y": 1319
                  },
                  {
                      "X": 442,
                      "Y": 1308
                  }
              ],
              "WordCoordPoint": [],
              "Words": []
          },
          {
              "AdvancedInfo": "{\"Parag\":{\"ParagNo\":1}}",
              "Confidence": 100,
              "DetectedText": "丽614开关斑竹#7支线",
              "ItemPolygon": {
                  "Height": 40,
                  "Width": 202,
                  "X": 532,
                  "Y": 1356
              },
              "Polygon": [
                  {
                      "X": 430,
                      "Y": 1309
                  },
                  {
                      "X": 632,
                      "Y": 1316
                  },
                  {
                      "X": 631,
                      "Y": 1356
                  },
                  {
                      "X": 428,
                      "Y": 1349
                  }
              ],
              "WordCoordPoint": [],
              "Words": []
          },
          {
              "AdvancedInfo": "{\"Parag\":{\"ParagNo\":2}}",
              "Confidence": 100,
              "DetectedText": "#001",
              "ItemPolygon": {
                  "Height": 75,
                  "Width": 175,
                  "X": 542,
                  "Y": 1422
              },
              "Polygon": [
                  {
                      "X": 435,
                      "Y": 1375
                  },
                  {
                      "X": 611,
                      "Y": 1375
                  },
                  {
                      "X": 611,
                      "Y": 1450
                  },
                  {
                      "X": 435,
                      "Y": 1450
                  }
              ],
              "WordCoordPoint": [],
              "Words": []
          }
      ]
  }
}

const App: React.FC = () => {
  const [form] = ProForm.useForm();
  const optionsRes = useServerConfigs();
  const [imgUrls, setImgUrls] = useState([])
  const router = useRouter();
  const { commonUploadProps } = useUpload();

  const getTexts = (text: string) => {
    try {
      // 正则表达式匹配 "涉及台区" 和其后的内容，处理冒号前后的空白字符
    const content = text.split('涉及台区:')[1] || text.split('涉及台区：')[1]
    
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

  const checkImgText = () => {
     // 调用文字识别接口 imgUrls
    const promises = imgUrls.map(imageUrl => {
      return axios.post(
        "/home/api/ocr",
        {imageUrl}
      );
    });

    Promise.allSettled(promises).then((results) =>
      console.log('result',results)
      // const res = results.filter((result:any) => result.status === "fulfilled");
      // console.log("res", res)
    );

    const finalDetectedTexts = [RES].map(r => {
      const detectedTexts = r?.Response?.TextDetections?.map(v => v.DetectedText);
      if (detectedTexts && detectedTexts.length > 0) {
        return detectedTexts.join('');
     } else {
      return '';
     }
    }).join(',');
    console.log("imgText", finalDetectedTexts)
    const withElectricWorkText = form.getFieldValue(EPlan.WithElectricWorkText.Name) || "";
    console.log("withElectricWorkText", withElectricWorkText)
    const checkRes = getTexts(withElectricWorkText).join(',');
    console.log('checkRes', checkRes);
    if (checkRes !== finalDetectedTexts) {
      Modal.error({
        title:'校验失败',
        content: <div>
          <p>文本内容：{checkRes|| "无"}</p>
          
          <p>图片内容：{finalDetectedTexts || "无"}</p>
        </div>
      })
    } else {
      Modal.success({
        title:'校验通过',
        content: "文本内容与图片内容一致"
      })
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
