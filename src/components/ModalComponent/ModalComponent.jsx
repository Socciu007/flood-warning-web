import { Modal } from "antd";
import React from "react";

const ModalComponent = ({
  title = "Modal",
  isOpen = false,
  width = 630,
  children,
  ...rests
}) => {
  return (
    <Modal title={title} open={isOpen} {...rests} width={width}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
