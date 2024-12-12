import React, { useEffect, useState } from "react";
import {
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { getAllRegion } from "../../services/serviceArea";
import { registerUser } from "../../services/serviceUser";
import { message } from "antd";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);

  // Get all regions
  const fetchAllRegion = async () => {
    const res = await getAllRegion();
    setRegions(res.data);
  };

  useEffect(() => {
    fetchAllRegion();
  }, []);

  const handleRegister = async (values) => {
    const res = await registerUser(values);
    if (res.data) {
      message.success(t("Register account successfully!"));
      navigate("/login");
    } else {
      message.error(t("Register account failed, please try again!"));
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>{t("REGISTER")}</h2>
        <p>{t("Welcome to the AquaGuardian")}</p>
        <ProForm
          onFinish={handleRegister}
          submitter={{
            searchConfig: {
              submitText: t("Register"),
            },
            submitButtonProps: { style: { width: "100%" } },
            resetButtonProps: false,
          }}
          initialValues={{
            username: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            confirmPassword: "",
            role: "",
            province: "",
            nameRegion: "",
          }}
        >
          <ProFormText
            name="username"
            placeholder={t("Username")}
            fieldProps={{ prefix: <UserOutlined /> }}
            rules={[
              { required: true, message: t("Please enter your username!") },
            ]}
          />
          <ProFormText
            name="email"
            fieldProps={{
              prefix: <MailOutlined />,
            }}
            placeholder={t("Email")}
            rules={[
              { required: true, message: t("Please enter your email!") },
              { type: "email", message: t("Please enter a valid email!") },
            ]}
          />
          <ProFormText
            name="phone"
            fieldProps={{
              prefix: <PhoneOutlined />,
            }}
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
            fieldProps={{ prefix: <HomeOutlined /> }}
            placeholder={t("Address")}
            rules={[
              { required: true, message: t("Please enter your address!") },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              prefix: <LockOutlined />,
            }}
            placeholder={t("Password")}
            rules={[
              { required: true, message: t("Please enter your password!") },
            ]}
          />
          <ProFormText.Password
            name="confirmPassword"
            fieldProps={{
              prefix: <LockOutlined />,
            }}
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
          />
          <ProFormSelect
            name="role"
            options={[
              { label: t("Citizen"), value: "user" },
              { label: t("Manager"), value: "manager" },
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
                    placeholder={t("Select management area")}
                    options={options}
                  />
                ) : null;
              }}
            </ProFormDependency>
          </ProForm.Group>
        </ProForm>
        <div className="login-link">
          {t("Already have an account?")}{" "}
          <a onClick={() => navigate("/login")}>{t("Login")}</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
