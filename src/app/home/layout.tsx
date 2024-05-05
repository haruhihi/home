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
import { EName } from "@constants/static";

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

  if (staticRoutes.every((route) => route.path !== path)) {
    if (path.startsWith("/home/plan/audit")) {
      staticRoutes.push({
        path,
        name: "审核计划",
        locale: "menu.audit",
      });
      // staticRoutes = [
      //   {
      //     path,
      //     name: "审核计划",
      //     locale: "menu.audit",
      //     routes: [
      //       { path: `${path}#${EName.Essential}`, name: EName.Essential },
      //       { path: `${path}#${EName.FullProcess}`, name: EName.FullProcess },
      //       { path: `${path}#${EName.Stable}`, name: EName.Stable },
      //       { path: `${path}#${EName.Risk}`, name: EName.Risk },
      //     ],
      //   },
      // ];
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
      menu={{ defaultOpenAll: true, hideMenuWhenCollapsed: true }}
    >
      {props.children}
    </ProLayout>
  );
};

export default Main;
