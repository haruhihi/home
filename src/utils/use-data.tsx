import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

interface Data {
  userInfo: any;
  updateUserInfo?: () => void;
}

const DataContext = React.createContext<Data | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Data>();

  const fetchUserInfo = async () => {
    const res = await axios.post("/home/api/account/info");
    setData((data) => {
      return {
        ...data,
        userInfo: res.data.result,
      };
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
