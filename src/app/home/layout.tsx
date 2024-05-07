"use client";
import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from "@ant-design/pro-components";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ApiOutlined, TeamOutlined } from "@ant-design/icons";
import { EUserRoleEnum } from "@dtos/db";
import { DataProvider, useData } from "@utils/data-provider";
import { ERoute } from "@constants/route";

const Main: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <DataProvider>
      <App>{props.children}</App>
    </DataProvider>
  );
};

const App: React.FC<{ children: React.ReactNode }> = (props) => {
  const router = useRouter();
  const path = usePathname();
  const { userInfo } = useData();

  let staticRoutes: any[] = [
    {
      path: "/home/plan/search",
      name: "首页",
      locale: "menu.home",
    },
    {
      path: "/home/plan/upload",
      name: "录入计划",
      locale: "menu.upload",
    },
    {
      path: "/home/login",
      name: "切换账号",
      locale: "menu.login",
    },
  ];
  const id = path.split("/").pop();

  // avoid page blink
  const staticRoutesForAudit = React.useMemo(() => {
    return [
      {
        path: ERoute.NoUsePlanDetailRoot,
        name: "项目必要性",
        routes: [
          {
            path: `${ERoute.PlanSource}/${id}`,
            name: "计划来源",
          },
          {
            path: `${ERoute.OneStopMultiUse}/${id}`,
            name: "一停多用",
          },
          {
            path: `${ERoute.MetricsImprovement}/${id}`,
            name: "指标提升情况",
          },
        ],
      },
      {
        path: ERoute.NoUsePlanDetailRoot,
        name: "计划全过程",
        locale: "menu.audit",
        routes: [
          {
            path: `${ERoute.LoadStop}/${id}`,
            name: "负荷停用",
            locale: "menu.audit",
          },
          {
            path: `${ERoute.WithElectricity}/${id}`,
            name: "带电作业",
            locale: "menu.audit",
          },
        ],
      },
      {
        path: ERoute.NoUsePlanDetailRoot,
        name: "供电可靠性",
        locale: "menu.audit",
        routes: [
          {
            path: `${ERoute.PowerCutHouseholds}/${id}`,
            name: "停电时户数",
            locale: "menu.audit",
          },
          {
            path: `${ERoute.FrequentPowerCut}/${id}`,
            name: "频繁停电",
            locale: "menu.audit",
          },
          {
            path: `${ERoute.RiskUsers}/${id}`,
            name: "敏感用户",
            locale: "menu.audit",
          },
          {
            path: `${ERoute.ServicePlan}/${id}`,
            name: "服务方案",
            locale: "menu.audit",
          },
        ],
      },
      {
        path: ERoute.NoUsePlanDetailRoot,
        name: "风险防范",
        locale: "menu.audit",
        routes: [
          {
            path: `${ERoute.Qualification}/${id}`,
            name: "人员资质",
            locale: "menu.audit",
          },
          {
            path: `${ERoute.ConstructionPic}/${id}`,
            name: "施工附图",
            locale: "menu.audit",
          },
          {
            path: `${ERoute.HighRiskPlace}/${id}`,
            name: "高风险作业点",
            locale: "menu.audit",
          },
          {
            path: `${ERoute.OnSiteInfo}/${id}`,
            name: "现场资料",
            locale: "menu.audit",
          },
          {
            path: `${ERoute.OnSitePic}/${id}`,
            name: "现场照片",
            locale: "menu.audit",
          },
        ],
      },
      {
        path: ERoute.NoUsePlanDetailRoot,
        name: "现场作业组织",
        locale: "menu.audit",
        routes: [
          {
            path: `${ERoute.DateAndSource}/${id}`,
            name: "作业时间及人员安排",
            locale: "menu.audit",
          },
          {
            path: `${ERoute.Review}/${id}`,
            name: "甲方履责及现场验收",
            locale: "menu.audit",
          },
        ],
      },
      {
        path: ERoute.NoUsePlanDetailRoot,
        name: "物资保障",
        locale: "menu.audit",
        routes: [
          {
            path: `${ERoute.EquipmentAllocation}/${id}`,
            name: "上传设备异动单",
            locale: "menu.audit",
          },
          {
            path: `${ERoute.MaterialAllocation}/${id}`,
            name: "物资调拨单",
            locale: "menu.audit",
          },
        ],
      },
    ];
  }, [id]);

  if (staticRoutes.every((route) => route.path !== path)) {
    if (path.startsWith("/home/plan/audit")) {
      // get the id in url
      staticRoutes = staticRoutesForAudit;
    }
    // clean routes when user is log in
    if (path === "/home/login") {
      staticRoutes = [];
    }
  }

  return (
    <ProLayout
      location={{
        pathname: path,
      }}
      logo={
        userInfo?.Role === EUserRoleEnum.Admin ? (
          <ApiOutlined />
        ) : (
          <TeamOutlined />
        )
      }
      title="作业集约管控"
      collapsed={false}
      collapsedButtonRender={false}
      onMenuHeaderClick={() => router.push("/home/plan/search")}
      bgLayoutImgList={[
        {
          src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
          left: 85,
          bottom: 100,
          height: "303px",
        },
        {
          src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
          bottom: -68,
          right: -45,
          height: "303px",
        },
        {
          src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
          bottom: 0,
          left: 0,
          width: "331px",
        },
      ]}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            //  jump to a path in nextjs
            router.push(item.path as string);
          }}
        >
          {dom}
        </div>
      )}
      route={{
        routes: staticRoutes,
      }}
      menu={{
        defaultOpenAll: true,
        hideMenuWhenCollapsed: true,
        ignoreFlatMenu: true,
      }}
    >
      {props.children}
    </ProLayout>
  );
};

export default Main;
