import styled  from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`
export const WrapperStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  };
  margin-bottom: 4px;
`

export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #f5f5fa;
  h5 {
    font-size: 15px;
    font-weight: 700;
    line-height: 37px;
  }
`

export const WrapperLeft = styled.div`
  width: 910px;
`

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`
export const WrapperFooterItem = styled.div`
  display: flex;
  flex-direction : column;
  gap: 10px;
  border-top: 1px solid rgb(235, 235, 240);
  width: 100%;
  align-items:flex-end;
  padding-top: 10px;
`

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items:flex-start;
  height: 90px;
  width: 100%;
`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
  flex-direction: column;
  width: 950px;
  margin: 0 auto;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 12px 12px #ccc;
`

export const WrapperStatus = styled.div`
  display:flex;
  align-item:flex-start;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(235, 235, 240);
  flex-direction:column;
`