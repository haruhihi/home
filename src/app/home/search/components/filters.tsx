"use client";
import {
  AlipayCircleOutlined,
  LockOutlined,
  PlusOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  DrawerForm,
  LightFilter,
  LoginForm,
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  QueryFilter,
  StepsForm,
} from "@ant-design/pro-components";
import { ISearchFilter } from "@dtos/api";
import { EPlan } from "@dtos/db";
import { Button, Space, message } from "antd";
import React, { useState } from "react";

const iconStyles = {
  marginInlineStart: "16px",
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "24px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const Filters: React.FC<{ onFinish: (value: ISearchFilter) => any }> = (
  props
) => {
  return (
    <>
      <div
        style={{
          margin: 24,
        }}
      >
        <QueryFilter
          // @ts-ignore
          labelWidth="auto"
          onFinish={props.onFinish}
        >
          <ProForm.Group>
            <ProFormText
              width="sm"
              name={EPlan.Place}
              label="供电所"
              tooltip="请输入供电所"
              placeholder="请输入供电所"
            />
            <ProFormText
              width="sm"
              name={EPlan.Section}
              label="台区"
              tooltip="请输入台区"
              placeholder="请输入台区"
            />
            <ProFormText
              width="sm"
              name={EPlan.Construction}
              label="施工单位"
              tooltip="请输入施工单位"
              placeholder="请输入施工单位"
            />
            <ProFormDatePicker
              width="sm"
              name={EPlan.ConstructionDate}
              label="时间"
              tooltip="请选择时间"
              placeholder="请选择时间"
            />
            <ProFormText
              width="sm"
              name={EPlan.ElectricLevel}
              label="电压等级"
              tooltip="请输入电压等级"
              placeholder="请输入电压等级"
            />
          </ProForm.Group>
        </QueryFilter>
      </div>
    </>
  );
};
