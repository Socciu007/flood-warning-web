import React from "react";
import "./style.scss";
import { ModalForm } from "@ant-design/pro-form";
import { useTranslation } from "react-i18next";

const ModalFormComponent = ({
  title,
  trigger,
  children,
  submitter,
  handleSubmitModal,
  open,
  props
}) => {
  const { t } = useTranslation();
  return (
    <ModalForm
      className="modal-form"
      open={open}
      title={t(title)}
      trigger={trigger}
      submitter={submitter}
      onFinish={handleSubmitModal}
      modalProps={{ ...props }}
    >
      {children}
    </ModalForm>
  );
};

export default ModalFormComponent;
