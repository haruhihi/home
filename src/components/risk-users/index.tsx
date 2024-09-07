import { EPersonData, ESection } from "@dtos/db";
import { Table  } from "antd";

export const RiskUsers: React.FC<{ people: any[], sections: any[]; }> = (props) => {
  if (!props) return "-";

  const { people, sections } = props
  return (
    <Table
      bordered
      dataSource={people}
      pagination={false}
      columns={[
        {
          title: EPersonData.ID.Label,
          width: 100,
          dataIndex: EPersonData.ID.Name,
          key: EPersonData.ID.Name,
        },
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
            if (!text) {
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
