import React from "react";
import { Image } from "antd";
import { WrapperSliderStyle } from "./style";

const SliderComponent = ({ arrImages, dots }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };
  return (
    <WrapperSliderStyle {...settings} dots={dots}>
      {arrImages.map((image) => {
        return (
          <Image
            key={image}
            src={image}
            alt="slider"
            preview={false}
            width="100%"
            height="300px"
          />
        );
      })}
    </WrapperSliderStyle>
  );
};

export default SliderComponent;
