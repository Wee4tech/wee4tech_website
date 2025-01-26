import {
  Col,
  Typography,
  // Card
} from "antd";
import styled from "styled-components";

const { Text, Title } = Typography;

export const UserCardContainer = styled(Col)`
  // width: 100%;
  // position: relative;
  background-color: #fff;
  // padding: 0px 16px;
  border-radius: 18px;
  border: solid 1px #dedede;
  // width: 100%;
`;

export const DiamondMemberText = styled(Text)`
  font-weight: 500;
  background-color: #9feafe;
  padding: 3px 8px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0a243f;
`;

export const UserDetailContainer = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

export const UserNameText = styled(Title)`
  margin: 0 !important;
  color: #0a243f !important;
`;
export const UserDetails = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const UserDetailHeading = styled(Text)`
  color: #6c7c8c;
`;
export const UserDetailText = styled(Text)`
  font-weight: 500;
  color: #0a243f;
`;
