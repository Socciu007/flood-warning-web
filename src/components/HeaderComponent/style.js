import { Row, Image } from "antd";
import styled from "styled-components";
import ModalComponent from "../ModalComponent/ModalComponent";

export const WrapperLogoHeader = styled(Image)`
    &.ant-image-img {
        width: 45px;
        height: 45px;
        vertical-align: middle;
        border-radius: 50%;
}
`

export const WrapperHeader = styled(Row)`
    // max-width: 100%;
    padding: 10px 0;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
    margin: 0 auto;
    & .ant-col.ant-col-4 {
        display: flex;
        align-items: center;
    }
    & .ant-col.ant-col-12 {
        max-width: 50%;
      
    }
    & .ant-col.ant-col-8 {
        display: flex; 
        gap: 30px;
        align-items: center;
        & span.anticon.anticon-user, span.anticon.anticon-shopping-cart{
            font-size: 32px;
            color: #fff;
        }
    }
`

export const WrapperTextHeader = styled.span`
    font-size: 15px;
    color: #74f7f1e8;
    font-weight: 700;
    text-align: left;
    line-height: 27.5px;
`

export const WrapperLanguage = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 10px;
    cursor: pointer;
    
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 15px;
    cursor: pointer;
    .ant-scroll-number.ant-badge-count.ant-badge-count-sm {
        font-size: 15px;
        font-weight: 400;
        background: #5fede5cf;
    }
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: #ed3b3bb0;
    }
`

export const PopupSignupShop = styled(ModalComponent)`
    .col-shop {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        &__name {
            flex-basis: 100px;
            font-size: 15px;
        }
    }
    input.ant-input {
        font-size: 15px;
        color: #01162B;
        border-bottom: 1px solid #ccc;
        border-top: none;
        border-left: none;
        border-right: none;
            box-shadow: 2px 1px 0px 0px rgba(8, 35, 106, 0.1);

    }
    input.ant-input:hover, .ant-input:focus  {
        border-color: rgba(1, 22, 43, 0.20);

    }
    .verify {
        margin-top: 8px;
        span {
            font-size: 15px;
            font-weight: 400;
            p {
                cursor: pointer;
            }
        }
        span.checkbox {
            cursor: pointer;
            padding: 6px 6px 6px 0px!important;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            position: relative;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            background-color: transparent;
            outline: 0px;
            border: 0px;
            margin: 0px;
            cursor: pointer;
            user-select: none;
            vertical-align: middle;
            appearance: none;
            text-decoration: none;
            padding: 9px;
            border-radius: 50%;
            color: rgba(0, 0, 0, 0.6);
    
        }
    }
    button.ant-modal-close {
        background: #f5f5f5;
        border-radius: 50px;
        svg {
            height: 12px;
            width: 12px;
        }
    }
    p {
        line-height: 27.5px;
        display: inline;
        color: #1971ff;
    }
    button.ant-btn {

        box-shadow: 0px 4px 10px 0px rgba(8, 35, 106, 0.25);
        width: 100%;
        height: 40px;
        color: #fff;
        font-size: 15px;
        font-weight: 700;
        border-radius: 8px;
    }
    button.ant-btn:hover {
        color: #fff!important;
    }
    .more-shop {
        display: flex;
        margin-top: 18px;
        border-bottom: 1px solid #ccc;
        gap: 10px;
        font-size: 15px;
        cursor: pointer;
    }
`