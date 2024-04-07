import React, { useEffect } from "react";
import {
  StyleNameProduct,
  WrapperCartStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import * as message from "../Message/Message";
import logo from "../../assets/pictures/logo.png";
import addToCart from "../../assets/icons/icon-addtocart.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrderProduct, resetOrder } from "../../redux/slices/orderSlide";
import { useTranslation } from "react-i18next";

const CardComponent = (props) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state?.user);
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    name,
    image,
    type,
    price,
    description,
    rating,
    countInStock,
    discount,
    selled,
    id,
  } = props;
  const generalString = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
  };
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  useEffect(() => {
    if (order.isSucessOrder) {
      message.success("Đã thêm vào giỏ hàng");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSucessOrder]);

  const handleAddOrderProduct = (id) => {
    if (!user?.id) {
      navigate("/sign-in", { state: location.pathname });
    } else {
      if (id) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: name,
              amount: 1,
              image: image,
              price: price,
              product: id,
              discount: discount,
              countInstock: countInStock,
            },
          })
        );
      }
    }
  };

  return (
    <WrapperCartStyle
      hoverable
      style={{ width: 196, cursor: "auto" }}
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="product" src={image} style={{ height: "200px" }} />}
      // onClick={() => handleDetailsProduct(id)}
    >
      <img
        onClick={() => handleDetailsProduct(id)}
        src={logo}
        alt="icon-logo"
        style={{
          width: "68px",
          height: "14px",
          position: "absolute",
          top: -1,
          left: -1,
        }}
      />
      <StyleNameProduct onClick={() => handleDetailsProduct(id)}>
        {generalString(name, 60)}
      </StyleNameProduct>
      <WrapperReportText onClick={() => handleDetailsProduct(id)}>
        <span>
          <b>{rating} </b>
          <StarFilled style={{ fontSize: "12px", color: "#fb6e2e" }} />
        </span>
        <WrapperStyleTextSell onClick={() => handleDetailsProduct(id)}>
          ({t("Sold")} {selled || 99}+)
        </WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <div onClick={() => handleDetailsProduct(id)}>
          {price?.toLocaleString()} đ
        </div>
        {discount !== undefined ? (
          <WrapperDiscountText onClick={() => handleDetailsProduct(id)}>
            -{discount}%
          </WrapperDiscountText>
        ) : (
          <></>
        )}
        <img
          onClick={() => handleAddOrderProduct(id)}
          src={addToCart}
          alt="icon-addToCart"
          style={{
            height: "16px",
            width: "16px",
            cursor: "pointer",
          }}
        ></img>
      </WrapperPriceText>
    </WrapperCartStyle>
  );
};

export default CardComponent;
