import { IAccountInfoRes } from "@dtos/api";
import axios from "axios";
import React, { useState, createContext, useEffect, useContext } from "react";

export const DataContext = createContext<
  | {
      userInfo: null | IAccountInfoRes;
      updateUserInfo: () => Promise<void>;
    }
  | undefined
>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState({
    userInfo: null,
  });

  const updateUserInfo = async () => {
    return await axios.post("/home/api/account/info").then((res) => {
      setData((data) => {
        return { ...data, userInfo: res.data.result };
      });
    });
  };

  useEffect(() => {
    updateUserInfo();
  }, []);

  return (
    <DataContext.Provider value={{ ...data, updateUserInfo }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const data = useContext(DataContext);
  return { ...data };
};
