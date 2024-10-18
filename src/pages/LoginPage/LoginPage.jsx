import React from 'react'
import { Form, Input, Button } from "antd";
import "./style.scss";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className='login-title'>HỆ THỐNG PHÒNG CHỐNG THIÊN TAI</h2>
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout='vertical'
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
          >
            <Input placeholder="Tài khoản" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
        </Form>
        <a href="#" className="sso-login">
          Đăng nhập SSO
        </a>
      </div>
    </div>
  );
};

export default LoginPage