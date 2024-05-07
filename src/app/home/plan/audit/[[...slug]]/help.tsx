import { ProForm } from "@ant-design/pro-components";
import { Footer } from "@components/footer-client";
import { IAuditReq } from "@dtos/api";
import { EPlan, EPlanStatusEnum } from "@dtos/db";
import { Button, Image, Input, Modal, Space, message } from "antd";
import axios from "axios";
import React, { useState } from "react";

const audit = async (params: IAuditReq, onSuccess: () => void) => {
  try {
    await axios.post("/home/api/plan/audit", params);
    return new Promise((resolve) => {
      message.success("提交成功", 2, () => {
        onSuccess();
        resolve("提交成功");
      });
    });
  } catch (err) {
    message.error((err as Error)?.message ?? `提交失败`);
  }
};

export const Footers: React.FC<{ id: string; onSuccess: () => void }> = (
  props
) => {
  const { id, onSuccess } = props;
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalProps, setModalProps] = useState({
    open: false,
    toType: EPlanStatusEnum.Approved,
  });

  const { open, toType } = modalProps;

  const title =
    toType === EPlanStatusEnum.Approved ? "请输入审核意见" : "请输入驳回原因";

  return (
    <Footer
      ele={
        <>
          <Button
            danger
            onClick={() => {
              setModalProps({ open: true, toType: EPlanStatusEnum.Rejected });
            }}
          >
            驳回
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setModalProps({ open: true, toType: EPlanStatusEnum.Approved });
            }}
          >
            同意
          </Button>
          <Modal
            title={title}
            open={open}
            onCancel={() =>
              setModalProps((state) => ({ ...state, open: false }))
            }
            onOk={async () => {
              setLoading(true);
              await audit(
                {
                  [EPlan.ID.Name]: id,
                  [EPlan.Status.Name]: toType,
                  [EPlan.AuditComment.Name]: comment,
                },
                onSuccess
              );
              setLoading(false);
            }}
            confirmLoading={loading}
          >
            <Input.TextArea
              value={comment}
              onChange={(ev) => setComment(ev.target.value)}
              rows={5}
              placeholder={`${title}，不超过300字`}
              maxLength={300}
            />
          </Modal>
        </>
      }
    ></Footer>
  );
};

export const ImgsFormItem: React.FC<{ value: string; label: string }> = (
  props
) => {
  const { value, label } = props;
  return (
    <ProForm.Item label={label}>
      {value ? (
        <Image.PreviewGroup>
          <Space
            size={12}
            style={{ maxWidth: 700, display: "flex", flexWrap: "wrap" }}
          >
            {value
              .split(",")
              .filter((v) => v)
              .map((url: string) => (
                <Image
                  key={url}
                  height={120}
                  width={120}
                  src={url}
                  preview
                  alt="计划来源"
                  style={{
                    display: "block",
                    objectFit: "contain",
                    border: "1px solid #d9d9d9",
                    borderRadius: 8,
                    padding: "0 10px",
                  }}
                />
              ))}
          </Space>
        </Image.PreviewGroup>
      ) : (
        "-"
      )}
    </ProForm.Item>
  );
};

export const DataTimeRangePickerFormItem: React.FC<{
  value: string;
  label: string;
}> = (props) => {
  const { value, label } = props;

  return <ProForm.Item label={label}>{value}</ProForm.Item>;
};
