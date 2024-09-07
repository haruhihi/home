import { ESection } from "@dtos/db";
import { usePlanDetail } from "@utils/detail-plan-provider";
import { List, Table, Tooltip, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FrequentPowerCut } from "@components/frequent-power-cut";

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
  return <FrequentPowerCut sectionIds={sections.map(i => i[ESection.ID.Name])}/>
};
