"use client";
import {
  ProForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  QueryFilter,
} from "@ant-design/pro-components";
import { SectionFormItem } from "@components/section-form-item";
import { WithElectricOptions, voltageLevelOptions } from "@constants/options";
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
      defaultCollapsed={false}
    >
      <ProForm.Group>
        <ProFormSelect
          width="sm"
          name={EPlan.Maintainer.Name}
          label={EPlan.Maintainer.label}
          placeholder={`请选择${EPlan.Maintainer.label}`}
          options={serverConfigs.operatorOptions}
        />
        <ProFormSelect
          width="sm"
          name={EPlan.Operator.Name}
          label={EPlan.Operator.label}
          placeholder={`请选择${EPlan.Operator.label}`}
          options={serverConfigs.operatorOptions}
        />
        <ProFormDatePicker
          width="sm"
          name={EPlan.ExpectStartAt.Name}
          label={EPlan.ExpectStartAt.label}
          placeholder={`请选择${EPlan.ExpectStartAt.label}`}
        />
      </ProForm.Group>
      <ProForm.Group>
        <SectionFormItem width="sm" />
        <ProFormSelect
          width="md"
          label={EPlan.VoltageLevel.label}
          name={EPlan.VoltageLevel.Name}
          options={voltageLevelOptions}
        />
        <ProFormSelect
          width="md"
          label={EPlan.WithElectric.label}
          name={EPlan.WithElectric.Name}
          options={WithElectricOptions}
        />
      </ProForm.Group>
    </QueryFilter>
  );
};
