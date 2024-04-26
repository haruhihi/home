"use client";

import React from "react";
import { Button, Flex, Input } from "antd";
const { TextArea } = Input;

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log("Change:", e.target.value);
};

const App: React.FC = () => (
  <Flex vertical gap={32}>
    <h1>计划必要性 - 计划来源</h1>
    <a href="./edit/1">编辑详情</a>
    <h1>自定义文字</h1>
    <TextArea
      showCount
      maxLength={600}
      onChange={onChange}
      placeholder="can resize"
      value={`高故障线路、防山火隐患治理，网架结构改造需求
      属地单位：张集供电所
      隐患情况：本次计划来源于张集供电所高故障线路绝缘化改造清单。（10千伏张16开关薛店线投运于1980年，运行时间长，处于山区，主线长度9.19KM，只有0.2KM为绝缘导线，由于全线裸导线，线路档距大，遇大风恶劣天气，导线舞动导致线路停运，2023年至今该线路主线、分支线共停运5次。）
      `}
      style={{
        width: 500,
        height: 400,
      }}
    />
    <h1>自定义图片</h1>
    <div>图片1</div>
    <img width="500" src="http://118.195.226.250/gjdw.png" alt="1" />
    <div>图片2</div>
    <img width="500" src="http://118.195.226.250/gjdw.png" alt="1" />
    <div>图片3</div>
    <img width="500" src="http://118.195.226.250/gjdw.png" alt="1" />
  </Flex>
);

export default App;
