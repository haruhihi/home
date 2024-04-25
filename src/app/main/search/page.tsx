"use client";

import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { Filters } from "./components/filters";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "属地单位",
    width: 220,
    dataIndex: "name",
    key: "name",
    fixed: "left",
    render: (text) => "张集供电所",
  },
  {
    title: "项目必要性 - 计划来源",
    width: 220,
    dataIndex: "name",
    key: "name",
    fixed: "left",
    render: (text) => (
      <a href="/main/plan/1" target="_blank">
        高故障线路、防山火隐患治理，网架结构改造需求
      </a>
    ),
  },
  {
    title: "项目必要性 - 一停多用",
    width: 220,
    dataIndex: "name",
    key: "name",
    fixed: "left",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "项目必要性 - 指标提升情况",
    width: 220,
    dataIndex: "name",
    key: "name",
    fixed: "left",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "计划预警",
    width: 100,
    dataIndex: "age",
    key: "age",
    fixed: "left",
  },
  {
    title: "供电可靠性",
    dataIndex: "address",
    key: "1",
    width: 150,
  },
  {
    title: "风险防范",
    dataIndex: "address",
    key: "2",
    width: 150,
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a>action</a>,
  },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const App: React.FC = () => (
  <div>
    <Filters />
    <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
  </div>
);

export default App;
