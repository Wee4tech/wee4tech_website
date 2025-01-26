import { styled } from "styled-components";
import { Col, Input, Layout, Typography } from "antd";
const { Header } = Layout;
const { Text } = Typography;
export const HeaderContainer = styled(Header)`
  //height: 68px;
  // padding-left: 24px;
 // padding: 1px 24px 0 24px;
 box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 3px 0px;
 
  ${({ theme }) => theme.breakpoints.sm} {
    // background-color: #007bff;
  }

  ${({ theme }) => theme.breakpoints.md} {
    // background-color: #ff9900;
  }

  ${({ theme }) => theme.breakpoints.lg} {
    // background-color: #00ff00;
  }
`;

export const LeftContainer = styled(Col)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
   gap: 8px;
`;
export const LeftContainerMobile = styled(Col)`
   display: flex;
   justify-content: flex-start;
   align-items: center;
  // gap: 2rem;
`;
export const OpenCloseButton = styled(Col)`
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding-left:10px;
`;

export const ViewText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;

export const CenterContainer = styled(Col)`
  display: flex;
  align-items: center;
  padding-top: 10px;
  min-width: 400px;
`;

export const SearchInput = styled(Input)`
  height: 48px;
  padding: 14px 24px;
  border-radius: 24px;
  border: 1px solid #dedede;
`;

export const RightContainer = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
`;

export const ProfileContainer = styled(Col)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ProfileText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: #0a243f !important;
  cursor: pointer;
`;

//---------------SELLER COMPONENTS
export const SellerBannerWrapper = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 24px;
  background-color: #0a243f;
`;

export const SellerViewText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

export const SellerProfileText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  text-decoration: underline;
`;
