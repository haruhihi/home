"use client";
import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { resolve } from "path";
import { RcFile } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  // action: "https:660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  action: (file: RcFile) => {
    console.log(file);
    return new Promise(() => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const App: React.FC = () => (
  <div style={{ maxWidth: "800px" }}>
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
    <div>录入信息如下</div>
    <h1>属地单位：张集供电所</h1>
    <h1>项目必要性 - 计划来源：高故障线路、防山火隐患治理，网架结构改造需求</h1>
  </div>
);

export default App;
