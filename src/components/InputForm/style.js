import { Input } from "antd";
import styled from "styled-components";

export const WrapperInput = styled(Input)`
    border-top: none;
    border-right: none;
    border-left: none;
    outline: none;
    &:focus {
        background-color: #9efff291;
    }
`