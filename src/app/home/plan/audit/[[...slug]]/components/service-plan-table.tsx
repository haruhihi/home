import { ESection } from "@dtos/db";
import { usePlanDetail } from "@utils/detail-plan-provider";
import { Table } from "antd";

export const ServicePlanTable = () => {
  const { detail } = usePlanDetail();
  if (!detail) return "-";
  const { sections } = detail;

  if (sections.every((section) => !section[ESection.ServicePlan.Name])) {
    return "无重点用户或拨打过95598客户";
  }

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
          title: ESection.ServicePlan.Label,
          width: 300,
          dataIndex: ESection.ServicePlan.Name,
          key: ESection.ServicePlan.Name,
          render: (text: string) => {
            if (!text) return "-";
            return text;
          },
        },
      ]}
    />
  );
};
