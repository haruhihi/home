"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { IRes } from "@dtos/api";
import { message } from "antd";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();
  const onFinish = (values: { username: string; password: string }) => {
    fetch("/home/api/login", { body: JSON.stringify(values), method: "POST" })
      .then((res) => res.json())
      .then((res: IRes) => {
        console.log("res", res);
        if (res.success) {
          router.replace("/home/search");
        } else {
          message.error("登录失败，请检查账号密码！");
        }
      });
  };
  return (
    <LoginForm
      title="登录中心"
      subTitle="请输入账号密码登录"
      onFinish={onFinish}
    >
      <ProFormText
        name="username"
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
        name="password"
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
