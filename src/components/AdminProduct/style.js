import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 15px;
    font-weight: 700;
    margin: 0;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select {
        width: 90px;
        height: 90px;
        margin-top: 10px;
    }
    & .ant-upload-list-item.ant-upload-list-item-error {
        margin-top: 10px;
    }
`