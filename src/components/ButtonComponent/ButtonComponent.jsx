import { Button } from "antd";
import React from "react";

const ButtonComponent = ({
  size,
  styleButton,
  styleTextButton,
  textButton,
  disabled,
  ...rest
}) => {
  return (
    <Button
      disabled={disabled}
      style={{
        ...styleButton,
        background: disabled ? "#ccc" : styleButton.background,
      }}
      size={size}
      {...rest}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
