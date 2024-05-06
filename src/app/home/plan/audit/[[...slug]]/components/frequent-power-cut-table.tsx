import { ESection } from "@dtos/db";
import { usePlanDetail } from "@utils/detail-plan-provider";
import { List, Table, Tooltip, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const FrequentPowerCutTable = () => {
  const { detail } = usePlanDetail();
  if (!detail) return "-";
  const { sections } = detail;
  const getTimeArr = (text: string) => {
    if (!text) {
      return [];
    }
    return text.split(",");
  };
  return (
    <Table
      bordered
      dataSource={sections}
      pagination={false}
      columns={[
        {
          title: ESection.ID.Label,
          width: 80,
          dataIndex: ESection.ID.Name,
          key: ESection.ID.Name,
        },
        {
          title: ESection.Name.Label,
          width: 80,
          dataIndex: ESection.Name.Name,
          key: ESection.Name.Name,
        },
        {
          title: ESection.YearPlanStop.Label,
          width: 200,
          dataIndex: ESection.YearPlanStop.Name,
          key: ESection.YearPlanStop.Name,
          render: (text) => {
            const arr = getTimeArr(text);
            if (arr.length === 0) return null;
            return (
              <List
                dataSource={arr}
                renderItem={(item: any) => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            );
          },
        },
        {
          title: ESection.ExceptionStop2Months.Label,
          width: 200,
          dataIndex: ESection.ExceptionStop2Months.Name,
          key: ESection.ExceptionStop2Months.Name,
          render: (text) => {
            const arr = getTimeArr(text);
            if (arr.length === 0) return null;
            return (
              <List
                dataSource={arr}
                renderItem={(item: any) => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            );
          },
        },
        {
          title: ESection.ExceptionStopUserCount2Months.Label,
          width: 120,
          dataIndex: ESection.ExceptionStopUserCount2Months.Name,
          key: ESection.ExceptionStopUserCount2Months.Name,
        },
        {
          title: (
            <div>
              是否通过
              {/* <Tooltip title="年度停运在2次及以下且2月内频繁停电台区在2次以下为通过">
                <QuestionCircleOutlined style={{ marginLeft: 4 }} />
              </Tooltip> */}
            </div>
          ),
          width: 80,
          dataIndex: "是否通过",
          key: "是否通过",
          render: (_, record) => {
            const yearStop = getTimeArr(record[ESection.YearPlanStop.Name]);
            const stop2 = getTimeArr(
              record[ESection.ExceptionStop2Months.Name]
            );
            const isPass = yearStop.length <= 2 && stop2.length <= 1;
            return (
              <Typography.Text type={isPass ? "success" : "danger"}>{`${
                isPass ? "" : "不"
              }通过`}</Typography.Text>
            );
          },
        },
      ]}
    />
  );
};
