import React from "react";
import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import "./style.scss";

const LoginPage = () => {
  const { t } = useTranslation();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">{t("DISASTER PREVENTION SYSTEM")}</h2>
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: t("Please enter your email!") }]}
            className="float-label-input"
          >
            <Input placeholder={t("Email")} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: t("Please enter your password!") },
            ]}
          >
            <Input.Password placeholder={t("Password")} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              {t("Login")}
            </Button>
          </Form.Item>
        </Form>
        <div className="login-link">
          <a href="#">{t("Forgot your password?")}</a>
          <a href="/register">{t("Register a new account")}</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
