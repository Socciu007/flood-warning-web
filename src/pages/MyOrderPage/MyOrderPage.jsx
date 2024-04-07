import React, { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import {
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperFooterItem,
  WrapperContainer,
  WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { useTranslation } from "react-i18next";

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token);
    return res.data;
  };
  const user = useSelector((state) => state.user);

  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchMyOrder,
    enabled: !!state?.id && !!state?.token,
  });
  const { isLoading, data } = queryOrder;

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHooks((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderService.cancelOrder(id, token, orderItems, userId);
    return res;
  });

  const handleCanceOrder = (order) => {
    mutation.mutate(
      {
        id: order._id,
        token: state?.token,
        orderItems: order?.orderItems,
        userId: user.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };
  const {
    isPending: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancle,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success();
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      message.error(dataCancel?.message);
    } else if (isErrorCancle) {
      message.error();
    }
  }, [isErrorCancle, isSuccessCancel]);

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}>
          <img
            src={order?.image}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              border: "1px solid rgb(238, 238, 238)",
              padding: "2px",
            }}
          />
          <div
            style={{
              width: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            {order?.name}
          </div>
          <span
            style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}
          >
            {convertPrice(order?.price)}
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  const handleHomePage = () => {
    navigate("/");
  };
  return (
    <Loading isLoading={isLoading || isLoadingCancel}>
      <WrapperContainer>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h5>
            <span style={{ cursor: "pointer" }} onClick={handleHomePage}>
              {t("Home")}
            </span>{" "}
            - {t("My orders")}
          </h5>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Trạng thái
                    </span>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>
                        Giao hàng:{" "}
                      </span>
                      <span
                        style={{
                          color: "rgb(90, 32, 193)",
                          fontWeight: "bold",
                        }}
                      >{`${
                        order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"
                      }`}</span>
                    </div>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>
                        Thanh toán:{" "}
                      </span>
                      <span
                        style={{
                          color: "rgb(90, 32, 193)",
                          fontWeight: "bold",
                        }}
                      >{`${
                        order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                      }`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>
                        Tổng tiền:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "rgb(56, 56, 61)",
                          fontWeight: 700,
                        }}
                      >
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <ButtonComponent
                        onClick={() => handleCanceOrder(order)}
                        size={40}
                        styleButton={{
                          height: "36px",
                          border: "1px solid #9255FD",
                          borderRadius: "4px",
                        }}
                        textButton="Hủy đơn hàng"
                        styleTextButton={{ color: "#9255FD", fontSize: "14px" }}
                      ></ButtonComponent>
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: "36px",
                          border: "1px solid #9255FD",
                          borderRadius: "4px",
                        }}
                        textButton="Xem chi tiết"
                        styleTextButton={{ color: "#9255FD", fontSize: "14px" }}
                      ></ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
