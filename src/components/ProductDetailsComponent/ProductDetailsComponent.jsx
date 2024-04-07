import { Col, Row, Image, Rate } from "antd";
import React, { useEffect, useState } from "react";
import imageSmall from "../../assets/pictures/imagesmall1.webp";
import SliderComponent from "../SliderComponent/SliderComponent";
import CommentComponent from "../CommentComponent/CommentComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {
  WrapperAddressProduct,
  WrapperIcon,
  WrapperImageText,
  WrapperInputNumberQuantity,
  WrapperQuantityProduct,
  WrapperStyleCategoryProduct,
  WrapperStyleCategoryProductSmall,
  WrapperStyleNameProduct,
  WrapperStylePrice,
  WrapperStylePriceText,
  WrapperStylePriceTextRight,
  WrapperStylePriceTextSmall,
  WrapperStyleTextSell,
} from "./style";
import {
  YoutubeOutlined,
  DropboxOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import * as message from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slices/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import { useTranslation } from "react-i18next";
import LikeComponent from "../LikeComponent/LikeComponent";

const ProductDetailsComponent = ({ idProduct }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const [numProduct, setNumProduct] = useState(1);
  const onChange = (value) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    const result = value && value !== "" ? value : 0;
    console.log(result);
    if (!isNaN(result) && decimalRegex.test(result)) {
      setNumProduct(parseInt(result));
    }
  };
  console.log("num", numProduct);

  //get details
  const fetchGetDetailProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    const res = await ProductService.getDetailProduct(id);
    console.log("res", res);
    return res.data;
  };
  const { isLoading, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailProduct,
    enabled: !!idProduct,
  });
  useEffect(() => {
    initFacebookSDK();
  }, []);

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [order?.orderItems, numProduct, productDetails]);
  useEffect(() => {
    if (order?.isSucessOrder) {
      message.success("Đã thêm vào giỏ hàng");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order?.isSucessOrder]);
  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(
        numProduct === productDetails.countInStock
          ? productDetails.countInStock
          : numProduct + 1
      );
    } else {
      setNumProduct(numProduct === 1 ? 1 : numProduct - 1);
    }
  };

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      console.log("orser", orderRedux);
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInstock: productDetails?.countInStock,
            },
          })
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <Row>
        <Col span={10}>
          <SliderComponent
            arrImages={[productDetails?.image, productDetails?.image]}
            dots="true"
          />
          <Row className="ant-row-option">
            <WrapperImageText span={8}>
              <WrapperIcon>
                <FontAwesomeIcon icon={faImage} style={{ color: "#5a5d63" }} />
              </WrapperIcon>
              <p>{t("See 4 more photos")}</p>
            </WrapperImageText>
            <WrapperImageText span={8}>
              <WrapperIcon>
                <YoutubeOutlined style={{ color: "#5a5d63" }} />
              </WrapperIcon>
              <p>{t("Watch product videos")}</p>
            </WrapperImageText>
            <WrapperImageText span={8}>
              <WrapperIcon>
                <DropboxOutlined style={{ color: "#5a5d63" }} />
              </WrapperIcon>
              <p>{t("What's in the box?")}</p>
            </WrapperImageText>
          </Row>
        </Col>
        <Col span={14}>
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <div style={{ marginBottom: "10px" }}>
            <Rate
              allowHalf
              defaultValue={3}
              value={productDetails?.rating}
              style={{ fontSize: "12px", color: "#fb6e2e" }}
            />
            <WrapperStyleTextSell>
              {t("Sold")}{" "}
              {productDetails?.selled ? `${productDetails?.selled}` : "99"}+
            </WrapperStyleTextSell>
            <WrapperStyleTextSell style={{ cursor: "pointer" }}>
              | {t("Q&A")}
            </WrapperStyleTextSell>
          </div>
          <WrapperStylePrice>
            {productDetails?.discount !== undefined ? (
              <>
                <WrapperStylePriceText>
                  {convertPrice(
                    productDetails?.price * (1 - productDetails?.discount / 100)
                  )}
                </WrapperStylePriceText>
                <WrapperStylePriceTextSmall>
                  {convertPrice(productDetails?.price)}
                </WrapperStylePriceTextSmall>
              </>
            ) : (
              <WrapperStylePriceText>
                {convertPrice(productDetails?.price)}
              </WrapperStylePriceText>
            )}
            <WrapperStylePriceTextRight>
              <span>{t("Installment plan starting from")} &nbsp;</span>
              <span>
                <strong>{convertPrice(productDetails?.price / 12)}</strong>/
                {t("month")}
              </span>
            </WrapperStylePriceTextRight>
          </WrapperStylePrice>
          <WrapperStyleCategoryProduct>
            <WrapperStyleCategoryProductSmall>
              <Image
                src={imageSmall}
                height={38}
                width={38}
                alt="image product category"
                preview={false}
                style={{ marginBottom: "4px" }}
              />
              <p>{t("Black")}</p>
            </WrapperStyleCategoryProductSmall>
            <WrapperStyleCategoryProductSmall>
              <Image
                src={imageSmall}
                height={38}
                width={38}
                alt="image product category"
                preview={false}
              />
              <p
                style={{ color: "#495057", fontWeight: "400", marginTop: "0" }}
              >
                {t("Yellow")}
              </p>
            </WrapperStyleCategoryProductSmall>
            <WrapperStyleCategoryProductSmall>
              <Image
                src={imageSmall}
                height={38}
                width={38}
                alt="image product category"
                preview={false}
              />
              <p
                style={{ color: "#495057", fontWeight: "400", marginTop: "0" }}
              >
                {t("Violet")}
              </p>
            </WrapperStyleCategoryProductSmall>
            <WrapperStyleCategoryProductSmall>
              <Image
                src={imageSmall}
                height={38}
                width={38}
                alt="image product category"
                preview={false}
              />
              <p
                style={{ color: "#495057", fontWeight: "400", marginTop: "0" }}
              >
                {t("White")}
              </p>
            </WrapperStyleCategoryProductSmall>
          </WrapperStyleCategoryProduct>
          <WrapperAddressProduct>
            <span>{t("Delivery to")}</span>
            <span className="address">{user?.address}</span>-
            <span className="change-address">{t("Change Address")}</span>
          </WrapperAddressProduct>
          <LikeComponent
            dataHref={"https://developers.facebook.com/docs/plugins/"}
          ></LikeComponent>
          <div className="wrapper-quantity">
            <div className="wrapper-quantity__number">{t("Quantity")}</div>
            <WrapperQuantityProduct>
              <button onClick={() => handleChangeCount("descrease")}>
                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
              <WrapperInputNumberQuantity
                min={1}
                max={productDetails?.countInStock}
                value={numProduct}
                onChange={onChange}
                size="small"
                type="Number"
              />
              <button onClick={() => handleChangeCount("increase")}>
                <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
            </WrapperQuantityProduct>
          </div>
          {errorLimitOrder && (
            <div style={{ color: "red", fontSize: "15px", lineHeight: "30px" }}>
              {t("Product is out of stock")}
            </div>
          )}
          <div className="wrapper-button">
            <ButtonComponent
              size={40}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={t("Purchase")}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              onClick={handleAddOrderProduct}
            />
            <ButtonComponent
              size={40}
              styleButton={{
                background: "#fff",
                height: "48px",
                width: "220px",
                border: "1px solid #1e63c3ad",
                borderRadius: "4px",
              }}
              textButton={t("Buy on Installment")}
              styleTextButton={{
                color: "#1e63c3ad",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </div>
        </Col>
        <CommentComponent
          dataHref={
            "https://developers.facebook.com/docs/plugins/comments#configurator"
          }
          // dataHref={
          //   process.env.REACT_APP_IS_LOCAL
          //     ? "https://developers.facebook.com/docs/plugins/comments#configurator"
          //     : window.location.href
          // }
          width="1240"
        />
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
