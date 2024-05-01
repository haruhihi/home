"use client";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ThunderboltOutlined } from "@ant-design/icons";

const App: React.FC<{ children: React.ReactNode }> = (props) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <ProLayout
      location={{
        pathname: path,
      }}
      logo={<ThunderboltOutlined />}
      title="国家电网"
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
        routes: [
          {
            path: "/home/search",
            name: "首页",
            locale: "menu.home",
          },
          {
            path: "/home/upload",
            name: "录入计划",
            locale: "menu.upload",
          },
        ],
      }}
      menu={{ defaultOpenAll: true, hideMenuWhenCollapsed: true }}
    >
      {props.children}
    </ProLayout>
  );
};

export default App;
