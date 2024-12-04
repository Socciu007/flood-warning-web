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
    >
      {children}
    </DrawerForm>
  );
};

export default DrawerComponent;
