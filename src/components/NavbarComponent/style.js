import styled from "styled-components";

export const NavBarStyle = styled.div`
    
    height: fit-content;
    border-radius: 8px;
    margin-top: 10px;
    background: #FFF;
    box-shadow: 0px 4px 10px 0px rgba(8, 35, 106, 0.25);
    .navbar-home {
        width: 180px;
        margin: 5px 15px;
    }
`

export const WrapperLabelText = styled.h4`
    color: #333;
    font-size: 15px;
    font-weight: 700;
    line-height: 30px;

`

export const WrapperTextValue = styled.span`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 0;
    color: #333;   
    font-size: 15px;
    font-weight: 400;
    line-height: 30px;
    cursor: pointer;
`

export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    .ant-checkbox-wrapper span {
        font-size: 15px;
        font-weight: 400;
        line-height: 30px;
    }
    .report-star {
        display: flex;
        gap: 10px;
        align-items: center;
        cursor: pointer;
        .ant-rate {
            font-size: 15px;
        }
        span {
            font-size: 15px;
            font-weight: 400;
            line-height: 30px;
        }
    }
`

export const WrapperTextPrice = styled.div`
    padding: 2px 15px;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
    color: rgb(39, 39, 42);
    border-radius: 15px;
    background-color: #c3c3c3;
    width: fit-content;

`