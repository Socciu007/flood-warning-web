import React from "react";
import {
  NavBarStyle,
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";
import smartPhone from "../../assets/icons/icon-smartphone.gif";
import laptop from "../../assets/icons/icon-laptop.gif";
import headPhones from "../../assets/icons/icon-headphones.gif";
import watch from "../../assets/icons/icon-watch.gif";
import smartWatch from "../../assets/icons/icon-smartwatch.gif";
import tablet from "../../assets/icons/icon-tablet.gif";
import fastService from "../../assets/icons/icon-fastservice.png";
import { useTranslation } from "react-i18next";

const NavbarComponent = () => {
  const { t } = useTranslation();
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, key) => {
          return (
            <WrapperTextValue key={key}>
              {option === "Smart Phone" && (
                <img
                  src={smartPhone}
                  alt="icon-phone"
                  style={{ width: "18px", height: "18px" }}
                ></img>
              )}
              {option === "Laptop" && (
                <img
                  src={laptop}
                  alt="icon-laptop"
                  style={{ width: "18px", height: "18px" }}
                ></img>
              )}

              {option === "Tablet" && (
                <img
                  src={tablet}
                  alt="icon-tablet"
                  style={{ width: "18px", height: "18px" }}
                ></img>
              )}
              {option === "Accessories" && (
                <img
                  src={headPhones}
                  alt="icon-headPhones"
                  style={{ width: "18px", height: "18px" }}
                ></img>
              )}
              {option === "Watch" && (
                <img
                  src={watch}
                  alt="icon-watch"
                  style={{ width: "18px", height: "18px" }}
                ></img>
              )}
              {option === "Smart Watch" && (
                <img
                  src={smartWatch}
                  alt="icon-smartWatch"
                  style={{ width: "18px", height: "18px" }}
                ></img>
              )}
              {option === "Utility Services" && (
                <img
                  src={fastService}
                  alt="icon-fastService"
                  style={{ width: "18px", height: "18px" }}
                ></img>
              )}
              {t(`${option}`)}
            </WrapperTextValue>
          );
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
            onChange={onChange}
          >
            {options.map((option, key) => {
              return (
                <Checkbox style={{}} key={key} value={t(option.value)}>
                  {t(option.label)}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option, key) => {
          return (
            <div key={key} className="report-star">
              <Rate disabled defaultValue={option} />
              <span>{t(`${option} stars`)}</span>
            </div>
          );
        });
      case "price":
        return options.map((option, key) => {
          return <WrapperTextPrice key={key}>{t(option)}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };

  return (
    <NavBarStyle>
      <div className="navbar-home">
        <WrapperLabelText>{t("Category")}</WrapperLabelText>
        <WrapperContent>
          {renderContent("text", [
            "Smart Phone",
            "Laptop",
            "Tablet",
            "Accessories",
            "Watch",
            "Smart Watch",
            "Utility Services",
          ])}
        </WrapperContent>
        <WrapperLabelText>{t("Checkbox")}</WrapperLabelText>
        <WrapperContent>
          {renderContent("checkbox", [
            { label: "Phone", value: "Đt" },
            { label: "Laptop", value: "laptop" },
            { label: "Accessories", value: "pk" },
          ])}
        </WrapperContent>
        <WrapperLabelText>{t("Report")}</WrapperLabelText>
        <WrapperContent>{renderContent("star", [3, 4, 5])}</WrapperContent>
        <WrapperLabelText>{t("Price")}</WrapperLabelText>
        <WrapperContent>
          {renderContent("price", ["Dưới 1$", "1$-2$", "Trên 2$"])}
        </WrapperContent>
      </div>
    </NavBarStyle>
  );
};

export default NavbarComponent;
