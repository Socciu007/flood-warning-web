import React, { useState, useEffect } from "react";
import {
  ProForm,
  ProFormText,
  ProFormUploadButton,
  ProFormSelect,
  ProFormDependency,
} from "@ant-design/pro-form";
import { useTranslation } from "react-i18next";
import { getAllRegion } from "../../services/serviceArea";
import "./style.scss";

const FormFillUser = () => {
  const { t } = useTranslation();
  const [regions, setRegions] = useState([]);

  // Get all regions
  const fetchAllRegion = async () => {
    const res = await getAllRegion();
    setRegions(res.data);
  };

  useEffect(() => {
    fetchAllRegion();
  }, []);

  return (
    <div className="user-form">
      <ProForm.Group className="user-form">
        <ProFormText
        name="username"
        placeholder={t("Username")}
        label={t("Username")}
        rules={[
            { required: true, message: t("Please enter your username!") },
        ]}
        />
          <ProFormUploadButton
          name="avatar"
          label={t("Avatar")}
          title={t("Upload")}
          max={1}
          fieldProps={{
            name: "file",
            listType: "picture-circle",
            defaultFileList: [],
          }}
        />
          <ProFormText
            name="email"
            label={t("Email")}
            placeholder={t("Email")}
            rules={[
              { required: true, message: t("Please enter your email!") },
              { type: "email", message: t("Please enter a valid email!") },
            ]}
          />
          <ProFormText
            name="phone"
            label={t("Phone")}
            placeholder={t("Phone number")}
            rules={[
              {
                required: true,
                message: t("Please enter your phone number!"),
              },
            ]}
          />
          <ProFormText
            name="address"
            label={t("Address")}
            placeholder={t("Address")}
            rules={[
              { required: true, message: t("Please enter your address!") },
            ]}
          />
          <ProFormText.Password
            name="password"
            label={t("Password")}
            placeholder={t("Password")}
            rules={[
              { required: true, message: t("Please enter your password!") },
            ]}
          />
          {/* <ProFormText.Password
            name="confirmPassword"
            label={t("Confirm password")}
            placeholder={t("Confirm password")}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: t("Please enter your confirm password!"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t("Passwords must match")));
                },
              }),
            ]}
          /> */}
          <ProFormSelect
            name="role"
            label={t("Role")}
            options={[
              { label: t("Citizen"), value: "citizen" },
              { label: t("Manager"), value: "manager" },
              { label: t("Admin"), value: "admin" },
            ]}
            placeholder={t("Select role")}
            rules={[{ required: true, message: t("Please select your role!") }]}
          />
          <ProForm.Group>
            <ProFormDependency name={["role"]}>
              {({ role }) => {
                const uniqueProvinces = [
                  ...new Set(regions.map((region) => region.province)),
                ]
                  .sort()
                  .map((province) => ({ label: province, value: province }));

                const options = uniqueProvinces;
                return role === "manager" ? (
                  <ProFormSelect
                    name="province"
                    label={t("Province")}
                    placeholder={t("Select province")}
                    options={options}
                  />
                ) : null;
              }}
            </ProFormDependency>
            <ProFormDependency name={["role", "province"]}>
              {({ role, province }) => {
                const areasInProvince = regions
                  .filter((region) => region.province === province)
                  .map((region) => ({ area: region.name }));
                const options = areasInProvince.map((area) => ({
                  label: area.area,
                  value: area.area,
                }));
                return role === "manager" ? (
                  <ProFormSelect
                    name="nameRegion"
                    label={t("Region")}
                    placeholder={t("Select region")}
                    options={options}
                  />
                ) : null;
              }}
            </ProFormDependency>
          </ProForm.Group>
      </ProForm.Group>
    </div>
  );
};

export default FormFillUser;
