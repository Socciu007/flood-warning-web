import { Col, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperImageText = styled(Col)`
    text-align: center;
    margin: 0 10px;
`

export const WrapperIcon = styled.span`
    font-size: 32px;
    line-height: .5;
    display: inline-block;
    margin-bottom: 4px;
`

export const WrapperStyleNameProduct = styled.h1`
        font-weight: 700;
    color: #01162B;
    font-size: 24px;
    line-height: 30px;
    word-beak: break-word;
`

export const WrapperStyleTextSell = styled.span`
    margin-left: 10px;
    color: #01162B;
    font-size: 15px;
    line-height: 30px;
`

export const WrapperStylePrice = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 16px;
    height: 40px;
    align-items: center;
    border-radius: 8px;
    background-color: #fdf9f9;
`

export const WrapperStylePriceText = styled.h1`
    font-weight: 400;
    color: #cb1c22;
    font-size: 24px;
    line-height: 30px;
        padding: 0 10px;
`

export const WrapperStylePriceTextSmall = styled.h1`
    transform: translate(20%, 0%);
    position: absolute;
    top: -15%;
    left: 20%;    
text-decoration: line-through;
    font-weight: 400;
    color: #01162B;
    font-size: 15px;
    line-height: 30px;
    flex: 1;
    opacity: 0.5;
`

export const WrapperStylePriceTextRight = styled.div`
    display: flex;
    position: absolute;
    left: 80%;
    flex-direction: column;
    color: #01162B;
    font-size: 15px;
    line-height: 20px;
    cursor: pointer;
}
`

export const WrapperStyleCategoryProduct = styled.div`
    display: flex;
    margin-bottom: 16px;
    flex-wrap: wrap;
`

export const WrapperStyleCategoryProductSmall = styled.div`
    display: grid;
    place-content: center;
    place-items: center;
    margin-right: 18px;
    cursor: pointer;
    p {
        font-size: 15px;
         
    line-height: 30px;
    font-weight: 400;
    color: #01162B;
    }
`

export const WrapperAddressProduct = styled.div`
    font-size: 15px;
    line-height: 30px;
    font-weight: 400;
    span.address {
        text-decoration: underline;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0 5px;
        cursor:pointer;
    }
    span.change-address {
        color: #ea1f1f;
        cursor:pointer;
        flex-shrink: 0;
        margin-left: 5px;
    }
`

export const WrapperQuantityProduct = styled.div`
    display: flex;
    gap: 5px;
    align-item: center;
    width: 85px;
    border: 1px solid #ccc;
    border-radius: 8px;
    button {
        border: none;
        background: transparent;
        cursor: pointer;
    }
`

export const WrapperInputNumberQuantity = styled(InputNumber)`
&.ant-input-number.ant-input-number-sm {
    width: 32px;
    border-top: none;
    border-bottom: none;
        border-radius: 0;
    .ant-input-number-handler-wrap {
        display: none !important;
    }
};
`


