"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { IRes } from "@dtos/api";
import { EUser } from "@dtos/db";
import { useData } from "@utils/data-provider";
import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();
  const { updateUserInfo } = useData();
  const onFinish = (values: { username: string; password: string }) => {
    axios
      .post("/home/api/account/login", values)
      .then((res) => {
        if (res.data.success) {
          updateUserInfo && updateUserInfo();
          router.replace("/home/plan/search");
        } else {
          message.error("登录失败，请检查账号密码！");
        }
      })
      .catch((err) => {
        console.log("err", err);
        message.error("登录失败，请检查账号密码！");
      });
  };
  return (
    <LoginForm
      title="登录中心"
      subTitle="请输入账号密码登录"
      onFinish={onFinish}
    >
      <ProFormText
        name={EUser.Account}
        fieldProps={{
          size: "large",
          prefix: <UserOutlined className={"prefixIcon"} />,
        }}
        placeholder={"请输入用户账号"}
        rules={[
          {
            required: true,
            message: "请输入用户账号!",
          },
        ]}
        label="用户账号"
      />
      <ProFormText.Password
        name={EUser.Password}
        fieldProps={{
          size: "large",
          prefix: <LockOutlined className={"prefixIcon"} />,
        }}
        placeholder={"请输入密码"}
        rules={[
          {
            required: true,
            message: "请输入密码！",
          },
        ]}
        label="用户密码"
      />
    </LoginForm>
  );
};

export default App;
