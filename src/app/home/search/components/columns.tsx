import { EPlan } from "@dtos/db";
import type { TableColumnsType } from "antd";
import dayjs from "dayjs";

export const columns: TableColumnsType<any> = [
  {
    title: "编号",
    width: 220,
    dataIndex: EPlan.ID,
    key: EPlan.ID,
  },
  {
    title: "供电所",
    width: 220,
    dataIndex: EPlan.Place,
    key: EPlan.Place,
  },
  {
    title: "台区",
    width: 220,
    dataIndex: EPlan.Section,
    key: EPlan.Section,
  },
  {
    title: "施工单位",
    width: 220,
    dataIndex: EPlan.Construction,
    key: EPlan.Construction,
  },
  {
    title: "时间",
    width: 220,
    dataIndex: EPlan.ConstructionDate,
    key: EPlan.ConstructionDate,
    render: (text) => dayjs(text).format("YYYY-MM-DD"),
  },
  {
    title: "电压等级",
    width: 220,
    dataIndex: EPlan.ElectricLevel,
    key: EPlan.ElectricLevel,
  },
  {
    title: "项目必要性 - 一停多用",
    width: 220,
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "项目必要性 - 指标提升情况",
    width: 220,
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "计划预警",
    width: 100,
    dataIndex: "age",
    key: "age",
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
