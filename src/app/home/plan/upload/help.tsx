import { ProFormDependency } from "@ant-design/pro-components";
import { EPlan } from "@dtos/db";
import { message } from "antd";
import axios from "axios";
import React from "react";

export const commonTextareaProps = {
  width: "md" as const,
  fieldProps: {
    autoSize: { minRows: 5 },
  },
};

export const onFinish = async (params: {
  values: any;
  onClose: () => void;
}) => {
  const { values, onClose } = params;
  try {
    await axios.post(
      "/home/api/plan/create",
      Object.keys(values).reduce((acc, key) => {
        const value = values[key];
        if (
          Array.isArray(value) &&
          value.some((item) => item && item.originFileObj instanceof File)
        ) {
          return { ...acc, [key]: value.map((item) => item.url) };
        }
        return { ...acc, [key]: value };
      }, {})
    );
    return new Promise((resolve) => {
      message.success("创建成功", 2, () => {
        onClose();
        resolve("创建成功");
      });
    });
  } catch (err) {
    message.error((err as Error).message ?? "创建失败");
    console.log(err);
  }
};

export const Dependence: React.FC<{
  children: React.ReactNode;
  dependOn: any;
  equals: any;
}> = (props) => {
  const { children, dependOn, equals } = props;
  return (
    <ProFormDependency name={[dependOn]}>
      {(values) => {
        return (
          <div
            style={{
              display: values[dependOn] === equals ? "block" : "none",
            }}
          >
            {children}
          </div>
        );
      }}
    </ProFormDependency>
  );
};
