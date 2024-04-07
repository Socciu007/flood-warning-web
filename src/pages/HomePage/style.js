import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`

export const WrapperButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    & button.ant-btn {
        cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
        height: 38px;
        width: 240px;
        border: 1px solid rgb(8, 124, 249);
        background: rgb(255, 255, 255);
        border-radius: 4px;
        color: rgb(8, 124, 249);
    }
    & button.ant-btn:hover {
        color: #fff;
        background-color: #087cf9;
    }
`

export const WrapperButtonMore = styled(ButtonComponent)`
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
    & :hover {
        color: #fff;
        background-color: #087cf9;
    }
`
export const WrapperContainer = styled.div`
    width: calc(100% - 200px);
    height: max-content;
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 24px;
    background: #FFF;
    box-shadow: 0px 4px 10px 0px rgb(31 4 255 / 49%);
    & .slick-slider {
        margin: 5px 15px;
        & .slick-list {
            border-radius: 8px;
            box-shadow: 0px 4px 10px 0px rgb(2 177 152 / 20%);
        }
    }
`
export const WrapperProducts = styled.div`
    margin: 30px 17px;
    display: flex;
    gap: 14px;
    & .ant-card-cover {
        margin: 0;
    }
    flex-wrap: wrap;
`