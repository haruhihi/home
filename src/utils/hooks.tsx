import { IAccountInfoRes, IFormConfigRes } from "@dtos/api";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export const useServerConfigs = () => {
  const [optionsRes, setOptionsRes] = useState<IFormConfigRes>();

  useEffect(() => {
    axios.get("/home/api/plan/config").then((res) => {
      setOptionsRes(res.data.result);
    });
  }, []);

  return optionsRes;
};

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<IAccountInfoRes>();
  useEffect(() => {
    axios.post("/home/api/account/info").then((res) => {
      setUserInfo(res.data.result);
    });
  }, []);
  return userInfo;
};
