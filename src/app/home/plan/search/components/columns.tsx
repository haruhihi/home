import { IFormConfigRes } from "@dtos/api";
import { EPlan, EPlanStatus, EUser, EUserRoleEnum } from "@dtos/db";
import { useData } from "@utils/data-provider";
import { Button, Modal, Typography, type TableColumnsType } from "antd";
import dayjs from "dayjs";

export const useColumns = (configs: {
  serverConfigs?: IFormConfigRes;
}): TableColumnsType<any> => {
  const { serverConfigs } = configs;
  const { userInfo } = useData();
  if (!serverConfigs || !userInfo) return [];
  return [
    {
      title: EPlan.ID.label,
      width: 60,
      dataIndex: EPlan.ID.Name,
      key: EPlan.ID.Name,
    },
    {
      title: EPlan.Maintainer.label,
      width: 80,
      dataIndex: EPlan.Maintainer.Name,
      key: EPlan.Maintainer.Name,
      render: (text) =>
        serverConfigs.maintainerOptions.find((i) => `${i.value}` === text)
          ?.label,
    },
    {
      title: EPlan.Operator.label,
      width: 150,
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
          <Typography.Paragraph
            ellipsis={{ rows: 2, tooltip: text }}
            style={{ marginBottom: 0 }}
          >
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
    ...(process.env.NODE_ENV === "development"
      ? [
          {
            title: EPlan.Section.label,
            width: 50,
            dataIndex: EPlan.Section.Name,
            key: EPlan.Section.Name,
          },
        ]
      : []),
    {
      title: EPlan.ExpectStartAt.label,
      key: EPlan.ExpectStartAt.Name,
      dataIndex: EPlan.ExpectStartAt.Name,
      width: 150,
      render: (text: string) =>
        text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
    },
    {
      title: EPlan.ExpectFinishAt.label,
      key: EPlan.ExpectFinishAt.Name,
      dataIndex: EPlan.ExpectFinishAt.Name,
      width: 150,
      render: (text: string) =>
        text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
    },
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
      width: 100,
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
                  审核
                </a>
              </>
            );
          } else {
            return "-";
          }
        }
        return (
          <>
            <Button
              onClick={() => {
                const comment = record[EPlan.AuditComment.Name];
                const status = record[EPlan.Status.Name];
                const defaultComment =
                  status === EPlanStatus.Approved.Name
                    ? "无审核意见"
                    : "无驳回原因";
                Modal.info({
                  title: "审核详情",
                  content: (
                    <div>
                      {!comment || comment === "" ? defaultComment : comment}
                    </div>
                  ),
                });
              }}
              type="link"
              size="small"
              style={{ padding: 0, marginRight: 4 }}
            >
              审核详情
            </Button>
          </>
        );
      },
    },
  ];
};
