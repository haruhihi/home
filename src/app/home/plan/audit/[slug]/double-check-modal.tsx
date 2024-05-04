import { Footer } from "@components/footer-client";
import { IAuditReq } from "@dtos/api";
import { EPlan, EPlanStatusEnum } from "@dtos/db";
import { Button, Input, Modal, message } from "antd";
import axios from "axios";
import React, { useState } from "react";

const audit = async (params: IAuditReq) => {
  try {
    await axios.post("/home/api/plan/audit", params);
    message.success(`提交成功`);
  } catch (err) {
    message.error((err as Error)?.message ?? `提交失败`);
  }
};

export const Footers: React.FC<{ id: string }> = (props) => {
  const { id } = props;
  const [comment, setComment] = useState("111");
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
            onOk={() => {
              audit({
                [EPlan.ID.Name]: id,
                [EPlan.Status.Name]: toType,
              });
            }}
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
