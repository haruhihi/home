import { IAccountInfoRes, IFormConfigRes } from "@dtos/api";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export const useServerConfigs = () => {
  const [optionsRes, setOptionsRes] = useState<IFormConfigRes>();

  useEffect(() => {
    axios.post("/home/api/config").then((res) => {
      setOptionsRes(res.data.result);
    });
  }, []);

  return optionsRes;
};
