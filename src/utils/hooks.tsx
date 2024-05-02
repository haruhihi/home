import { IFormConfigRes } from "@dtos/api";
import axios from "axios";
import { useEffect, useState } from "react";

export const useServerConfigs = () => {
  const [optionsRes, setOptionsRes] = useState<IFormConfigRes>();

  useEffect(() => {
    axios.get("/home/api/plan/config").then((res) => {
      setOptionsRes(res.data.result);
    });
  }, []);

  return optionsRes;
};
