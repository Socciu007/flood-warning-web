import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { updateUser } from "../../redux/slices/userSlice";
import { Button } from "antd";
import { getBase64 } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => {
    const { id, ...rests } = data;
    UserService.updateUser(id, rests);
  });
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDatailsUser(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
      })
    );
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log("image", file.preview);
    setAvatar(file.preview);
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
    });
  };
  const handleHomePage = () => {
    navigate("/");
  };
  return (
    <div
      style={{ maxWidth: "1270px", margin: "0 auto", height: "max-content" }}
    >
      <WrapperHeader>
        {" "}
        <span style={{ cursor: "pointer" }} onClick={handleHomePage}>
          {t("Home")}
        </span>{" "}
        - {t("User information")}
      </WrapperHeader>
      <Loading isLoading={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="Name">{t("Name")}: </WrapperLabel>
            <InputForm
              placeholder=""
              id="Name"
              style={{ width: "300px" }}
              value={name}
              onChange={handleOnChangeName}
            ></InputForm>
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "max-content",
                borderRadius: "4px",
              }}
              textButton={t("Edit")}
              styleTextButton={{
                color: "#fb535378",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="Avatar">{t("Avatar")}: </WrapperLabel>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "300px",
                justifyContent: "space-between",
              }}
            >
              <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                <Button icon={<UploadOutlined />}>{t("Upload")}</Button>
              </WrapperUploadFile>
              {avatar && (
                <img
                  src={avatar}
                  alt="avatar"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "max-content",
                borderRadius: "4px",
              }}
              textButton={t("Edit")}
              styleTextButton={{
                color: "#fb535378",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email: </WrapperLabel>
            <InputForm
              placeholder=""
              id="email"
              style={{ width: "300px" }}
              value={email}
              onChange={handleOnChangeEmail}
            ></InputForm>
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "max-content",
                borderRadius: "4px",
              }}
              textButton={t("Edit")}
              styleTextButton={{
                color: "#fb535378",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="Address">{t("Address")}: </WrapperLabel>
            <InputForm
              placeholder=""
              id="Address"
              style={{ width: "300px" }}
              value={address}
              onChange={handleOnChangeAddress}
            ></InputForm>
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "max-content",
                borderRadius: "4px",
              }}
              textButton={t("Edit")}
              styleTextButton={{
                color: "#fb535378",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="Phone">{t("Phone")}: </WrapperLabel>
            <InputForm
              placeholder=""
              id="Phone"
              style={{ width: "300px" }}
              value={phone}
              onChange={handleOnChangePhone}
            ></InputForm>
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "max-content",
                borderRadius: "4px",
              }}
              textButton={t("Edit")}
              styleTextButton={{
                color: "#fb535378",
                fontSize: "14px",
                fontWeight: "600",
              }}
            ></ButtonComponent>
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
