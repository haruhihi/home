"use client";

import { PlanDetailProvider } from "@utils/detail-plan-provider";

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return <PlanDetailProvider>{props.children}</PlanDetailProvider>;
};

export default Layout;
