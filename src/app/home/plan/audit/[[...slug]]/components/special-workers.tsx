import { EPersonData, EPlan, ESection, EUser } from "@dtos/db";
import { usePlanDetail } from "@utils/detail-plan-provider";
import { List, Table, Typography } from "antd";

export const SpecialWorkersTable = () => {
  const { detail } = usePlanDetail();
  if (!detail) return "-";
  const { workOwners, workers, specialWorkers } = detail;
  return (
    <Table
      bordered
      dataSource={[
        ...workOwners.map((worker) => ({
          ...worker,
          身份: EPlan.WorkOwners.label,
        })),
        ...workers.map((worker) => ({
          ...worker,
          身份: EPlan.Workers.label,
        })),
        ...specialWorkers.map((worker) => ({
          ...worker,
          身份: EPlan.SpecialWorkers.label,
        })),
      ]}
      pagination={false}
      columns={[
        {
          title: "编号",
          width: 40,
          dataIndex: EUser.ID,
          key: EUser.ID,
        },
        {
          title: "姓名",
          width: 60,
          dataIndex: EUser.Name,
          key: EUser.Name,
        },
        {
          title: "身份",
          width: 60,
          dataIndex: "身份",
          key: "身份",
        },
        {
          title: "特种作业",
          width: 100,
          dataIndex: EUser.SpecialWork,
          key: EUser.SpecialWork,
        },
      ]}
    />
  );
};
