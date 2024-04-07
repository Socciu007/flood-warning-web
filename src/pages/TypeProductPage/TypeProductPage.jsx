import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import Loading from "../../components/LoadingComponent/Loading";
import {
  WrapperNavbar,
  WrapperProducts,
  WrapperTitleTypePage,
  WrapperTypeProduct,
} from "./style";
import { Col, Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useDebounceHooks } from "../../hooks/useDebounceHooks";
import { useTranslation } from "react-i18next";

const TypeProductPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounceHooks(searchProduct, 500);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });

  const fetchTypeProduct = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status === "OK") {
      setLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchTypeProduct(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);
  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };
  const handleHomePage = () => {
    navigate("/");
  };

  return (
    <Loading isLoading={loading}>
      <div style={{ width: "100%", background: "#efefef" }}>
        <div style={{ width: "1270px", margin: "0 auto" }}>
          <WrapperTitleTypePage>
            <span style={{ cursor: "pointer" }} onClick={handleHomePage}>
              {t("Home")}
            </span>{" "}
            <span style={{ cursor: "pointer" }}>- {t("Category")}</span> -{" "}
            {t(state)}
          </WrapperTitleTypePage>
          <WrapperTypeProduct>
            <WrapperNavbar span={4}>
              <NavbarComponent />
            </WrapperNavbar>
            <Col span={20}>
              <WrapperProducts>
                {products
                  ?.filter((pro) => {
                    if (searchDebounce === "") {
                      return pro;
                    } else if (
                      pro?.name
                        ?.toLowerCase()
                        .includes(searchDebounce?.toLowerCase())
                    ) {
                      return pro;
                    }
                  })
                  ?.map((product) => {
                    return (
                      <CardComponent
                        key={product._id}
                        id={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        discount={product.discount}
                        selled={product.selled}
                      />
                    );
                  })}
              </WrapperProducts>
              <Pagination
                showQuickJumper
                defaultCurrent={panigate?.page + 1}
                total={panigate?.total}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
            </Col>
          </WrapperTypeProduct>
        </div>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
