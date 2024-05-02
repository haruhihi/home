import { IFormConfigRes } from "@dtos/api";
import { EPlan } from "@dtos/db";
import type { TableColumnsType } from "antd";
import dayjs from "dayjs";

export const getColumns = (configs: {
  serverConfigs: IFormConfigRes;
}): TableColumnsType<any> => {
  const { serverConfigs } = configs;
  return [
    {
      title: "编号",
      width: 220,
      dataIndex: EPlan.ID.Name,
      key: EPlan.ID.Name,
    },
    // {
    //   title: "供电所",
    //   width: 220,
    //   dataIndex: EPlan.Place,
    //   key: EPlan.Place,
    // },
    // {
    //   title: "台区",
    //   width: 220,
    //   dataIndex: EPlan.Section,
    //   key: EPlan.Section,
    // },
    {
      title: "施工单位",
      width: 220,
      dataIndex: EPlan.Operator.Name,
      key: EPlan.Operator.Name,
      render: (text) =>
        serverConfigs.operatorOptions.find((i) => `${i.value}` === text)?.label,
    },
    {
      title: "时间",
      width: 220,
      dataIndex: EPlan.CreatedAt.Name,
      key: EPlan.CreatedAt.Name,
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    // {
    //   title: "电压等级",
    //   width: 220,
    //   dataIndex: EPlan.ElectricLevel,
    //   key: EPlan.ElectricLevel,
    // },
    // {
    //   title: "项目必要性 - 一停多用",
    //   width: 220,
    //   dataIndex: "name",
    //   key: "name",
    //   render: (text) => <a>{text}</a>,
    // },
    // {
    //   title: "项目必要性 - 指标提升情况",
    //   width: 220,
    //   dataIndex: "name",
    //   key: "name",
    //   render: (text) => <a>{text}</a>,
    // },
    // {
    //   title: "计划预警",
    //   width: 100,
    //   dataIndex: "age",
    //   key: "age",
    // },
    // {
    //   title: "供电可靠性",
    //   dataIndex: "address",
    //   key: "1",
    //   width: 150,
    // },
    // {
    //   title: "风险防范",
    //   dataIndex: "address",
    //   key: "2",
    //   width: 150,
    // },
    {
      title: "操作",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <a href={`/home/plan/audit/${record[EPlan.ID.Name]}`} target="_blank">
          审核
        </a>
      ),
    },
  ];
};
