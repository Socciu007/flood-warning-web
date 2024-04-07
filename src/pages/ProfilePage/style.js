import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  
    color: #000;
    font-size: 15px;
    font-weight: 700;
    margin: 4px 0;
    line-height: 30px;
    heigth: 100%;
`

export const WrapperContentProfile = styled.h1`
    background: #fff;  
    box-shadow: 0px 4px 10px 0px rgba(8, 35, 106, 0.25);    
    display: flex;
    border: none;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 8px;
    gap: 30px;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 14px;
    line-height: 30px;
    font-weight: 600;
    width: 100px;
    align-item: left;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    // .ant-upload-wrapper {
    //     width: 300px;
    // }
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload-list-item.ant-upload-list-item-error{
        display: none;
    }
`