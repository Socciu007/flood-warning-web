import styled from "styled-components";

export const LayoutSignIn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ccc;
    height: 100vh;
`

export const WrapperContainer = styled.div`
    display: flex;
    width: 800px;
    height: 445px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px 0px rgba(8, 35, 106, 0.25);
`

export const WrapperContainerLeft = styled.div`
    flex: 1;
    padding: 40px 45px 24px;
    h1 {
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
    }
    p {
        font-size: 15px;
        font-weight: 400;
        line-height: 30px;
    }
    .email-input {
        margin-top: 10px
    }
    .ant-input {
        font-size: 15px;
        margin-bottom: 10px;
        box-shadow: 0px 2px 6px 0px rgb(190 219 216 / 50%);
    }
    .is-show-password {
        position: relative;
        cursor: pointer;
        &__icon {
            z-index: 100;
            position: absolute;
            top: 20%;
            right: 4%;
            transform: translate(50%, 0%);
            font-size: 15px;
            color: rgb(125, 114, 114);
        }
    }
    button {
        height: 40px;
        width: 100%;
        border: none;
        border-radius: 8px;
        margin: 26px 0px 10px;
        box-shadow: 0px 4px 10px 0px rgba(187, 148, 47, 0.25);
        span {
            color: #fff;
            font-size: 15px;
            font-weight: 700;
            line-height: 30px;
        }
    }
`

export const WrapperContainerRight = styled.div`
    width: 300px;
    background-color: #ffa39e6e;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
        border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    h4 {
        font-size: 15px;
        line-height: 30px;
    }
`

export const WrapperTextLight = styled.span`
    color: #0d0ddb;
    font-size: 15px;
    line-height: 30px;
    cursor: pointer;
`