import React from "react";
import { useState } from "react";
import {
  LayoutSignUp,
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Loading from "../../components/LoadingComponent/Loading";
import * as messages from "../../components/Message/Message";
import imageLogo from "../../assets/pictures/logoshop.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useEffect } from "react";

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowComfirmPassword, setIsShowComfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const [password, setPassword] = useState("");
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const mutation = useMutationHooks((data) => UserService.signUpUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      messages.success();
      handleNavigateLogin();
    } else if (isError) {
      messages.error();
    }
  }, [isSuccess, isError, data]);

  const handleSignUp = () => {
    mutation.mutateAsync({ email, password, confirmPassword });
  };

  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  return (
    <LayoutSignUp>
      <WrapperContainer>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Điền thông tin đăng ký tài khoản</p>
          <InputForm
            className="email-input"
            placeholder={"Abc@gmail.com"}
            value={email}
            onChange={handleOnChangeEmail}
          ></InputForm>
          <div className="is-show-password">
            <span
              className="is-show-password__icon"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder={"Password"}
              type={isShowPassword ? "text" : "Password"}
              value={password}
              onChange={handleOnChangePassword}
            ></InputForm>
          </div>
          <div className="is-show-password">
            <span
              className="is-show-password__icon"
              onClick={() => setIsShowComfirmPassword(!isShowComfirmPassword)}
            >
              {isShowComfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder={"Comfirm password"}
              type={isShowComfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnChangeConfirmPassword}
            ></InputForm>
          </div>
          <div style={{ marginLeft: "10px", marginTop: "6px" }}>
            {data?.status === "ERR" && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {data?.message}
              </span>
            )}
          </div>
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              styleButton={{ background: "rgb(255, 57, 69)" }}
              onClick={handleSignUp}
              size={40}
              textButton="Đăng ký"
            ></ButtonComponent>
          </Loading>
          <p>
            Bạn đã có tài khoản?
            <WrapperTextLight onClick={handleNavigateLogin}>
              {" "}
              Đăng nhập
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="image-logo"
            height={"203px"}
            width={"203px"}
            style={{ borderRadius: "50%" }}
          ></Image>
          <h4>Tận hưởng thế giới số tại Go Tech</h4>
        </WrapperContainerRight>
      </WrapperContainer>
    </LayoutSignUp>
  );
};

export default SignUpPage;
