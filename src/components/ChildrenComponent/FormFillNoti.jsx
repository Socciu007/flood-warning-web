import { ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import React from "react";
import { useTranslation } from "react-i18next";
const FormFillNoti = () => {
  const { t } = useTranslation();
  return (
    <div>
      <ProFormText
        name="title"
        label={t("Title")}
        placeholder={t("Enter notice title")}
      />
      <ProFormText
        name="description"
        label={t("Description")}
        placeholder={t("Enter notice description")}
      />
      <ProFormTextArea
        name="content"
        label={t("Content")}
        placeholder={t("Enter notice content")}
      />
    </div>
  );
};

export default FormFillNoti;
