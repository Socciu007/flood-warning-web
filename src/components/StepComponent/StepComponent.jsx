import { Steps } from "antd";
import React from "react";
import { CustomStep } from "./style";
const StepComponent = ({ current = 0, items = [] }) => {
  return (
    <Steps current={current}>
      {items.map((item) => {
        return (
          <CustomStep
            key={item.title}
            title={item.title}
            description={item.description}
          />
        );
      })}
    </Steps>
  );
};

export default StepComponent;
