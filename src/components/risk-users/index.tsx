import { ISectionDetailRes } from "@dtos/api";
import { EPersonData, ESection } from "@dtos/db";
import { Modal, Table  } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export const RiskUsers: React.FC<{ sectionIds: any[]; }> = (props) => {
  const [sectionDetail, setSectionDetail] = useState<ISectionDetailRes | null>(null);
  
  useEffect(() => {
  if (!props || !props.sectionIds) return;
  axios
    .post('/home/api/section/detail', { sectionIds: props.sectionIds })
    .then(res => {
      setSectionDetail(res.data.result)
    })
  }, [])

  
  if (!props || !props.sectionIds) return "请选择台区";

  if (!sectionDetail) return '正在校验中'
  
  const { sections, people } = sectionDetail
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
