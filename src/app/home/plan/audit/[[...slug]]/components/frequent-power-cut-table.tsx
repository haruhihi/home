import { ESection } from "@dtos/db";
import { usePlanDetail } from "@utils/detail-plan-provider";
import { List, Table, Typography } from "antd";

export const FrequentPowerCutTable = () => {
  const { detail } = usePlanDetail();
  if (!detail) return "-";
  const { sections } = detail;
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
            return (
              <List
                dataSource={text.split(",")}
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
            return (
              <List
                dataSource={text.split(",")}
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
      ]}
    />
  );
};
