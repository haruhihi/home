"use client";

import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { Filters } from "./components/filters";
import { ISearchFilter, ISearchReq, ISearchRes } from "@dtos/api";
import { serialize } from "@utils/helper";
import { columns } from "./components/columns";
import { EPlan } from "@dtos/db";
import { debounce } from "lodash";
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

const defaultPage = 1;

const App: React.FC = () => {
  const [res, setRes] = useState<ISearchRes>();
  const [params, setParams] = useState<ISearchFilter>({
    page: defaultPage,
    pageSize: 5,
  });

  const fetchData = (params: ISearchFilter) => {
    fetch("/home/api/search?" + serialize(params), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setRes(res.result);
        message.success("查询成功");
      });
  };

  useEffect(() => {
    fetchData(params);
  }, [params]);

  const onFinish = async (values: any) => {
    console.log("on finish");
    setParams({ ...values, page: defaultPage, pageSize: params.pageSize });
  };

  return (
    <div>
      <Filters onFinish={onFinish} />

      <Table
        style={{
          margin: 24,
        }}
        bordered
        columns={columns}
        dataSource={res?.data}
        pagination={{
          total: res?.totalCount,
          pageSize: params.pageSize,
          current: params.page,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (page: number, pageSize: number) => {
            console.log("on change");
            setParams((params) => {
              return { ...params, page, pageSize };
            });
          },
        }}
      />
    </div>
  );
};

export default App;
