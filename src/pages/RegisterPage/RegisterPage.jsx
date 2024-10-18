import React from "react";
import { Form, Input, Button, Select } from "antd";
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

const { Option } = Select;

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Xử lý logic đăng ký ở đây
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>{t("REGISTER")}</h2>
        <p>{t("Welcome to the Disaster Prevention System")}</p>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[
              { required: true, message: t("Please enter your username!") },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder={t("Username")} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t("Please enter your email!") },
              { type: "email", message: t("Please enter a valid email!") },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder={t("Email")} />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: t("Please enter your phone number!") },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder={t("Phone number")} />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: t("Please enter your address!") }]}
          >
            <Input
              prefix={<HomeOutlined />}
              placeholder={t("Address")}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t("Please enter your password!") },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("Password")}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
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
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("Confirm password")}
            />
          </Form.Item>
          <Form.Item
            name="role"
            rules={[{ required: true, message: t("Please select your role!") }]}
          >
            <Select placeholder={t("Select role")}>
              <Option value="user">{t("Government")}</Option>
              <Option value="admin">{t("User")}</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-button"
            >
              {t("Register")}
            </Button>
          </Form.Item>
        </Form>
        <div className="login-link">
          {t("Already have an account?")}{" "}
          <a onClick={() => navigate("/login")}>{t("Login")}</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
