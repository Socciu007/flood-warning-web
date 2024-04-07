import styled from "styled-components";
import {Card} from 'antd'

export const WrapperCartStyle = styled(Card)`
    img {
        height: 170px;
        width: 170px;
    }
    position: relative;
    .ant-card-body {
        cursor: pointer;
    }
`

export const StyleNameProduct = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #333;
    outline: none;
    margin: 0 0 8px;
`

export const WrapperReportText = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: #fb6e2e;
    display: flex;
    align-items: center;
    margin: 0 0 8px;
`

export const WrapperPriceText = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #d0021c;
    font-size: 18px;
    font-weight: 400;
`
export const WrapperDiscountText = styled.small`
    color: #eb5757;
    background: #fff0e9;
    border-radius: 4px;
    padding: 1px 5px 2px 5px;
    line-height: 130%;
    border-radius: 15px;
    font-size: 13px;
`

export const WrapperStyleTextSell = styled.span`
    margin-left: 10px;
    color: #333;
    font-size: 15px;
    line-height: 24px;
`