import React from "react";
import { DrawerForm } from "@ant-design/pro-form";
import { useTranslation } from "react-i18next";

const DrawerComponent = ({
  title,
  open,
  onOpenChange,
  onFinish,
  submitter,
  children,
  props,
  formRef
}) => {
  const { t } = useTranslation();
  return (
    <DrawerForm
      onOpenChange={onOpenChange}
      open={open}
      title={t(title)}
      onFinish={onFinish}
      submitter={submitter}
      drawerProps={{ ...props }}
      formRef={formRef}
    >
      {children}
    </DrawerForm>
  );
};

export default DrawerComponent;
