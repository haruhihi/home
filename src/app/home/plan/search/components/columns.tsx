import { IFormConfigRes } from "@dtos/api";
import { EPlan, EPlanStatus, EUser, EUserRoleEnum } from "@dtos/db";
import { useData } from "@utils/data-provider";
import { Button, Modal, Typography, type TableColumnsType } from "antd";

export const useColumns = (configs: {
  serverConfigs?: IFormConfigRes;
}): TableColumnsType<any> => {
  const { serverConfigs } = configs;
  const { userInfo } = useData();
  if (!serverConfigs || !userInfo) return [];
  return [
    {
      title: EPlan.ID.label,
      width: 220,
      dataIndex: EPlan.ID.Name,
      key: EPlan.ID.Name,
    },
    {
      title: EPlan.Maintainer.label,
      width: 220,
      dataIndex: EPlan.Maintainer.Name,
      key: EPlan.Maintainer.Name,
      render: (text) =>
        serverConfigs.maintainerOptions.find((i) => `${i.value}` === text)
          ?.label,
    },
    {
      title: EPlan.Operator.label,
      width: 220,
      dataIndex: EPlan.Operator.Name,
      key: EPlan.Operator.Name,
      render: (text) =>
        serverConfigs.operatorOptions.find((i) => `${i.value}` === text)?.label,
    },
    {
      title: EPlan.VoltageLevel.label,
      width: 100,
      dataIndex: EPlan.VoltageLevel.Name,
      key: EPlan.VoltageLevel.Name,
    },
    {
      title: EPlan.WorkContent.label,
      width: 300,
      dataIndex: EPlan.WorkContent.Name,
      key: EPlan.WorkContent.Name,
      render: (text) => {
        return (
          <Typography.Paragraph ellipsis={{ rows: 2, tooltip: text }}>
            {text}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: EPlan.WithElectric.label,
      width: 100,
      dataIndex: EPlan.WithElectric.Name,
      key: EPlan.WithElectric.Name,
    },
    {
      title: EPlan.PowerCut.label,
      width: 100,
      dataIndex: EPlan.PowerCut.Name,
      key: EPlan.PowerCut.Name,
    },
    // {
    //   title: "时间",
    //   width: 220,
    //   dataIndex: EPlan.CreatedAt.Name,
    //   key: EPlan.CreatedAt.Name,
    //   render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    // },
    {
      title: EPlan.Status.label,
      key: EPlan.Status.Name,
      dataIndex: EPlan.Status.Name,
      fixed: "right",
      width: 100,
      render: (_, record) => {
        return (EPlanStatus as any)[record[EPlan.Status.Name]].label;
      },
    },
    {
      title: "操作",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (_, record) => {
        // Pending 态
        if (record[EPlan.Status.Name] === EPlanStatus.Pending.Name) {
          if (userInfo[EUser.Role] === EUserRoleEnum.Admin) {
            return (
              <>
                <a
                  href={`/home/plan/audit/${record[EPlan.ID.Name]}`}
                  target="_blank"
                >
                  去审核
                </a>
              </>
            );
          } else {
            return "-";
          }
        }
        return (
          <Button
            onClick={() => {}}
            type="link"
            size="small"
            style={{ padding: 0 }}
          >
            查看详情
          </Button>
        );
      },
    },
  ];
};
