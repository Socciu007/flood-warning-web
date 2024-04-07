import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton = "Tìm kiếm",
    bordered,
    borderRadius = "0px",
    backgroundColorInput = "#fff",
    backgroundColorButton = "#ab8986",
    colorButton = "#fff",
    clicked,
  } = props;
  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{
          backgroundColor: backgroundColorInput,
          borderRadius: borderRadius,
          fontSize: "15px",
          fontWeight: 400,
        }}
        {...props}
      />
      <ButtonComponent
        size={size}
        styleButton={{
          background: backgroundColorButton,
          borderRadius: borderRadius,
          fontSize: "15px",
          fontWeight: 400,
          width: "22%",
        }}
        icon={<SearchOutlined style={{ color: colorButton }} />}
        textButton={textButton}
        styleTextButton={{
          color: colorButton,
        }}
        onClick={clicked}
      />
    </div>
  );
};

export default ButtonInputSearch;
