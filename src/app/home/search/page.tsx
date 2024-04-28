"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Filters } from "./components/filters";
import { ISearchReq, ISearchRes } from "@dtos/api";
import { serialize } from "@utils/helper";
import { columns } from "./components/columns";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const App: React.FC = () => {
  const [res, setRes] = useState<ISearchRes>();
  const [pageSet, setPageSet] = useState<ISearchReq>({ page: 1, pageSize: 5 });

  const fetchData = async (pageSet: ISearchReq) => {
    fetch("/home/api/search?" + serialize(pageSet), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setRes(res.result));
  };

  useEffect(() => {
    fetchData(pageSet);
  }, [pageSet]);

  return (
    <div>
      <Filters />
      <Table
        columns={columns}
        dataSource={res?.data}
        pagination={{
          total: res?.totalCount,
          pageSize: pageSet.pageSize,
          current: pageSet.page,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (page: number, pageSize: number) => {
            setPageSet({ page, pageSize });
          },
        }}
      />
    </div>
  );
};

export default App;
