import { ProFormSelect, ProFormSelectProps } from "@ant-design/pro-components";
import { TOptions } from "@dtos/api";
import { EPlan } from "@dtos/db";
import axios from "axios";
import React, { useState } from "react";

export const SectionFormItem: React.FC<Partial<ProFormSelectProps>> = (
  props
) => {
  const [sectionOptions, setSectionOptions] = useState<TOptions>([]);
  return (
    <ProFormSelect
      width="md"
      name={EPlan.Section.Name}
      label={EPlan.Section.label}
      options={sectionOptions}
      showSearch
      placeholder="请输入关键词查找后选择"
      fieldProps={{
        options: sectionOptions,
        onSearch: async (value) => {
          const options = await axios
            .get(`/home/api/config/sections?name=${value}`)
            .then((res) => res.data.result);
          setSectionOptions(options);
        },
      }}
      mode="multiple"
      {...props}
    />
  );
};
