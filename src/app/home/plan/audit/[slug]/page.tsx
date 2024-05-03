"use client";
import React, { useEffect } from "react";
import BigForm from "../../upload/page";
import axios from "axios";
import { message } from "antd";

const App: React.FC<{ params: { slug: string } }> = (props) => {
  const {
    params: { slug },
  } = props;
  console.log(props);

  useEffect(() => {
    axios
      .post("/home/api/plan/detail", { id: slug })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        message.error(err.message ?? "查询失败");
      });
  }, [slug]);
  return <BigForm />;
};

export default App;
