import { IPlanDetailRes } from "@dtos/api";
import { message } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export const PlanDetailContext = React.createContext<{
  detail: IPlanDetailRes | null;
}>({ detail: null });

export const PlanDetailProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [detail, setDetail] = useState<IPlanDetailRes | null>(null);

  const id =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : null;

  useEffect(() => {
    if (!id) return;
    axios
      .post("/home/api/plan/detail", { id })
      .then((res) => setDetail(res.data.result))
      .catch((err) => {
        message.error(err.message ?? "查询失败 id:" + "id");
      });
  }, [id]);

  return (
    <PlanDetailContext.Provider value={{ detail }}>
      {children}
    </PlanDetailContext.Provider>
  );
};

export const usePlanDetail = () => {
  const data = useContext(PlanDetailContext);
  return data;
};
