"use client";
import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  QueryFilter,
} from "@ant-design/pro-components";
import { IFormConfigRes, ISearchFilter } from "@dtos/api";
import { EPlan } from "@dtos/db";
import React from "react";

export const Filters: React.FC<{
  onFinish: (value: ISearchFilter) => any;
  serverConfigs: IFormConfigRes;
}> = (props) => {
  const { serverConfigs, onFinish } = props;
  return (
    <QueryFilter
      // @ts-ignore
      labelWidth="auto"
      onFinish={props.onFinish}
    >
      <ProForm.Group>
        {/* <ProFormText
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
        /> */}
        <ProFormSelect
          width="sm"
          name={EPlan.Operator.Name}
          label="施工单位"
          placeholder="请输入施工单位"
          options={serverConfigs.operatorOptions}
        />
        <ProFormDatePicker
          width="sm"
          name={EPlan.CreatedAt.Name}
          label="时间"
          tooltip="查询当天所有计划"
          placeholder="请选择时间"
        />
        {/* <ProFormText
          width="sm"
          name={EPlan.ElectricLevel}
          label="电压等级"
          tooltip="请输入电压等级"
          placeholder="请输入电压等级"
        /> */}
      </ProForm.Group>
    </QueryFilter>
  );
};
