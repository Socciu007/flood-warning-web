import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { loginUser } from "../../services/serviceUser";
import { setUser } from "../../redux/slices/userSlice.ts";
import storageService from "../../services/storage.service";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated,currentUser } = useSelector((state) => state.user);
  console.log("currentUser", currentUser);

  useEffect(() => {
    if (isAuthenticated || currentUser) {
      navigate("/");
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Handle login
  const handleLogin = async (values) => {
    const res = await loginUser(values);

    if (res.data) {
      // Set access token and user to local storage
      storageService.set("accessToken", res.data.accessToken);
      storageService.set("user", JSON.stringify(res.data.user));

      // Update user state
      dispatch(
        setUser({
          ...res.data.user,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        })
      );
      message.success(t("Login successfully!"));
      navigate("/");
    } else {
      message.error(t("Login failed, please try again!"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">{t("DISASTER PREVENTION SYSTEM")}</h2>
        <Form
          name="login"
          className="login-form"
          initialValues={{ email: "", password: "" }}
          onFinish={handleLogin}
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
