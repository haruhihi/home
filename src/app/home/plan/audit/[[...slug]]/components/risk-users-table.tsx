import { EPersonData, ESection } from "@dtos/db";
import { usePlanDetail } from "@utils/detail-plan-provider";
import { List, Table, Typography } from "antd";

export const RiskUsersTable = () => {
  const { detail } = usePlanDetail();
  if (!detail) return "-";
  const { people, sections } = detail;
  return (
    <Table
      bordered
      dataSource={people}
      pagination={false}
      columns={[
        {
          title: EPersonData.Name.Label,
          width: 100,
          dataIndex: EPersonData.Name.Name,
          key: EPersonData.Name.Name,
        },
        {
          title: EPersonData.PhoneNum.Label,
          width: 100,
          dataIndex: EPersonData.PhoneNum.Name,
          key: EPersonData.PhoneNum.Name,
        },
        {
          title: EPersonData.Risk.Label,
          width: 100,
          dataIndex: EPersonData.Risk.Name,
          key: EPersonData.Risk.Name,
        },
        {
          title: EPersonData.SectionId.Label,
          width: 100,
          dataIndex: EPersonData.SectionId.Name,
          key: EPersonData.SectionId.Name,
          render: (text) => {
            if (!text || text.split(",").length === 0) {
              return "";
            }
            return (
              sections.find((section) => section[ESection.ID.Name] === text)?.[
                ESection.Name.Name
              ] ?? "-"
            );
          },
        },
      ]}
    />
  );
};
