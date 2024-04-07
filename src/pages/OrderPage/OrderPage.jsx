import { Form } from "antd";
import "./style.scss";
import React, { useEffect, useState } from "react";
import { CustomCheckbox } from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperInputNumberQuantity } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slices/orderSlide";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import StepComponent from "../../components/StepComponent/StepComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);
  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0;
      return total + (cur.price * totalDiscount * cur.amount) / 100;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 20000 && priceMemo < 500000) {
      return 10000;
    } else if (priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);
  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleAddCard = () => {
    if (!order?.orderItemsSlected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isPending, data } = mutationUpdate;

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };
  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const itemsDelivery = [
    {
      title: "20.000 VND",
      description: "Dưới 200.000 VND",
    },
    {
      title: "10.000 VND",
      description: "Từ 200.000 VND đến dưới 500.000 VND",
    },
    {
      title: "Free ship",
      description: "Trên 500.000 VND",
    },
  ];
  const handleHomePage = () => {
    navigate("/");
  };
  return (
    <div className="layout-order-page">
      <div className="layout-order-page__nav">
        <h5 style={{ fontWeight: 700 }}>
          {" "}
          <span style={{ cursor: "pointer" }} onClick={handleHomePage}>
            {t("Home")}
          </span>{" "}
          - {t("Cart")}
        </h5>
        <div className="layout-order-page__content">
          <div className="layout-order-page__content__wrapper-left">
            <div className="layout-order-page__content__wrapper-left__header">
              <h4>{t("Delivery Fee")}</h4>
              <StepComponent
                items={itemsDelivery}
                current={
                  diliveryPriceMemo === 10000
                    ? 2
                    : diliveryPriceMemo === 20000
                    ? 1
                    : order.orderItemsSlected.length === 0
                    ? 0
                    : 3
                }
              />
            </div>
            <div className="wrapper-header">
              <span style={{ display: "inline-block", width: "390px" }}>
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                ></CustomCheckbox>
                <span>
                  {" "}
                  {t("All")} ({order?.orderItems?.length} {t("product")})
                </span>
              </span>
              <div className="wrapper-header__col">
                <div style={{ width: "120px" }}>
                  <span>{t("Unit Price")}</span>
                </div>
                <span>{t("Quantity")}</span>
                <div style={{ width: "120px" }}>
                  <span>{t("Subtotal")}</span>
                </div>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </div>
            <div className="layout-order-page__content__wrapper-left__list-order">
              {order?.orderItems?.map((order) => {
                return (
                  <div
                    className="layout-order-page__content__wrapper-left__list-order__item-order"
                    key={order?.product}
                  >
                    <div className="wrapper-checkbox">
                      <CustomCheckbox
                        onChange={onChange}
                        value={order?.product}
                        checked={listChecked.includes(order?.product)}
                      ></CustomCheckbox>
                      <img src={order?.image} alt="order" />
                      <div className="wrapper-name-order">{order?.name}</div>
                    </div>
                    <div className="wrapper-price-count-remove">
                      <div style={{ width: "120px" }}>
                        <span style={{ color: "#242424" }}>
                          {convertPrice(order?.price)}
                        </span>
                      </div>
                      <div className="count-order">
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount(
                              "decrease",
                              order?.product,
                              order?.amount === 1
                            )
                          }
                        >
                          <MinusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                        <WrapperInputNumberQuantity
                          defaultValue={order?.amount}
                          type="Number"
                          value={order?.amount}
                          size="small"
                          min={1}
                          max={order?.countInstock}
                        />
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount(
                              "increase",
                              order?.product,
                              order?.amount === order.countInstock,
                              order?.amount === 1
                            )
                          }
                        >
                          <PlusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                      </div>
                      <div style={{ width: "120px" }}>
                        <span>
                          {convertPrice(order?.price * order?.amount)}
                        </span>
                      </div>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(order?.product)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="layout-order-page__content__wrapper-right">
            <div className="wrapper-right">
              <div className="wrapper-info">
                <div>
                  <span>{t("Address")}: </span>
                  <span style={{ fontWeight: 700 }}>
                    {`${user?.address} ${user?.city}`}{" "}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{ color: "#9255FD", cursor: "pointer" }}
                  >
                    {t("Change")}
                  </span>
                </div>
              </div>
              <div className="wrapper-info">
                <div className="wrapper-info__price-total">
                  <span>{t("Provisional")}</span>
                  <span
                    style={{
                      color: "#000",

                      fontWeight: 700,
                    }}
                  >
                    {convertPrice(priceMemo)}
                  </span>
                </div>
                <div className="wrapper-info__price-total">
                  <span>{t("Discount")}</span>
                  <span
                    style={{
                      color: "#000",

                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceDiscountMemo)}
                  </span>
                </div>
                <div className="wrapper-info__price-total">
                  <span>{t("Delivery Fee")}</span>
                  <span
                    style={{
                      color: "#000",
                      fontWeight: 700,
                    }}
                  >
                    {convertPrice(diliveryPriceMemo)}
                  </span>
                </div>
              </div>
              <div className="wrapper-total">
                <span>{t("Total")}</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254, 56, 52)",
                      fontSize: "24px",
                      fontWeight: 700,
                    }}
                  >
                    {convertPrice(totalPriceMemo)}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    ({t("Includes VAT if applicable")})
                  </span>
                </span>
              </div>
            </div>
            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                boxShadow: "rgb(112 38 38 / 50%) 0px 4px 10px 0px",
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "8px",
              }}
              textButton={t("Buy")}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </div>
        </div>
      </div>
      <ModalComponent
        title={t("Update Delivery Information")}
        open={isOpenModalUpdateInfo}
        onCancel={handleCancleUpdate}
        onOk={handleUpdateInforUser}
      >
        <Loading isLoading={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label={t("Name")}
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateUserDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label={t("City")}
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <InputComponent
                value={stateUserDetails["city"]}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
            <Form.Item
              label={t("Phone")}
              name="phone"
              rules={[{ required: true, message: "Please input your  phone!" }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label={t("Address")}
              name="address"
              rules={[
                { required: true, message: "Please input your  address!" },
              ]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default OrderPage;
