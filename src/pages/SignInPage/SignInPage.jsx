import React, { useEffect, useState } from "react";
import {
  LayoutSignIn,
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Image } from "antd";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Loading from "../../components/LoadingComponent/Loading";
import imageLogo from "../../assets/pictures/logoshop.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "../../redux/slices/userSlice";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const user  = useSelector((state) => state.user)

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDatailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleSignIn = () => {
    mutation.mutate({ email, password });
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  return (
    <LayoutSignIn>
      <WrapperContainer>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>
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
          <div style={{ marginTop: "6px", marginLeft: "10px" }}>
            {data?.status === "ERR" && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {data?.message}
              </span>
            )}
          </div>
          <Loading isLoading={false}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              styleButton={{ background: "rgb(255, 57, 69)" }}
              size={40}
              textButton={"Đăng nhập"}
            ></ButtonComponent>
          </Loading>
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?
            <WrapperTextLight onClick={handleNavigateSignUp}>
              {" "}
              Tạo tài khoản
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
    </LayoutSignIn>
  );
};

export default SignInPage;
