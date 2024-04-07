import { Col, Row } from "antd";
import styled from "styled-components";

export const WrapperTitleTypePage = styled.h5`
    font-size: 15px;
    font-weight: 700;
    line-height: 30px;
`
export const WrapperTypeProduct = styled(Row)`
    flex-wrap: nowrap;
    gap: 16px;
    .dinYpP {
        margin-top: 0;
    }
`

export const WrapperNavbar = styled(Col)`
    // height: fit-content;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 4px 10px 0px rgba(8, 35, 106, 0.25);
    .ksXidR {
        box-shadow: none;
        margin-top: 0;
    }
    .lhbMps {
        margin-top: 0;
    }
    .lhbMps .navbar-home {
        margin: 0px 15px !important;
    }
`

export const WrapperProducts = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`

