import { Spin } from "antd";
import React from "react";

const LoadingComponent = ({ children, isLoading, delay = 2000 }) => {
  return (
    <Spin spinning={isLoading} delay={delay}>
      {children}
    </Spin>
  );
};

export default LoadingComponent;
