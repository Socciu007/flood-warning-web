import React from "react";
import {
  ProForm,
  ProFormText,
  ProFormUploadButton,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const FormFillUser = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <ProForm.Group className="user-form">
        <ProFormText
          name="username"
          label={t("Account")}
          placeholder={t("Account")}
          initialValue={currentUser?.username}
          allowClear={false}
        />
        <ProFormUploadButton
          name="avatar"
          label={t("Avatar")}
          title={t("Upload")}
          max={1}
          fieldProps={{
            name: "file",
            listType: "picture-circle",
            defaultFileList: currentUser?.avatar
              ? [{ url: currentUser.avatar }]
              : [],
          }}
        />
        <ProFormText
          name="email"
          label={t("Email")}
          placeholder={t("Email")}
          initialValue={currentUser?.email}
          allowClear={false}
        />
        <ProFormText
          name="phone"
          label={t("Phone")}
          placeholder={t("Phone")}
          initialValue={currentUser?.phone}
          allowClear={false}
        />
        <ProFormTextArea
          name="address"
          label={t("Address")}
          placeholder={t("Address")}
          initialValue={currentUser?.address}
          allowClear={false}
        />
      </ProForm.Group>
    </>
  );
};

export default FormFillUser;
