import { RiskUsers } from "@components/risk-users";
import { EPersonData, ESection } from "@dtos/db";
import { usePlanDetail } from "@utils/detail-plan-provider";
import { List, Table, Typography } from "antd";

export const RiskUsersTable = () => {
  const { detail } = usePlanDetail();
  if (!detail) return "-";
  const { sections } = detail;
  return (
    <RiskUsers sectionIds={sections.map(i => i[ESection.ID.Name])}
    />
  );
};
