import React from "react";
import { Col, Typography } from "antd";
import "./CustomProfileSection.css";
import { ReactComponent as MobCreditBlackIcon } from "../../../assets/icons/mobCreditBlackIcon.svg";
import { ReactComponent as InactiveMobCreditBlackIcon } from "../../../assets/icons/inactiveMobCredit.svg";

const MobCreditCard = (props) => {
  const { Text } = Typography;
  const { ruipiCheck, approved_balance, available_balance,rupifyData } = props;
  let primary_status = rupifyData?.primary_status;
  return (
    <>
      <Col
        // className={
        //   ruipiCheck
        //     ? "mob-credit-container-active"
        //     : "mob-credit-container-inactive"
        // }
        className={
          ruipiCheck ? "mob-credit-container-active" : 
            ["PRE_APPROVED", "PRE_APPROVAL_PENDING", "INCOMPLETE", "UNDER_REVIEW"].includes(primary_status) ? "mob-credit-container-incomplete" : "mob-credit-container-inactive"
        }
      >
        <Col className="mob-credit-icon-container">
          {ruipiCheck ? <MobCreditBlackIcon /> : <InactiveMobCreditBlackIcon />}
          <Col>
            <Text
              className={
                ruipiCheck ? "approved-text-active" : 
                  ["PRE_APPROVED", "PRE_APPROVAL_PENDING", "INCOMPLETE", "UNDER_REVIEW"].includes(primary_status) ? "approved-text-incomplete" : "approved-text-inactive"
              }
            >
              {ruipiCheck  ? (
                <> Active: ₹ {(approved_balance || 0).toFixed(2) || 0}</>
              ) : (
                <>
                  {/* <Text className="text-danger"> Account Inactive </Text> */}
               
                {primary_status === "REJECTED" ? (
                  <Text className="text-danger"> REJECTED</Text>
                ) : primary_status === "PRE_APPROVED" ? (
                  <Text className="text-progress">IN PROGRESS</Text>
                ) : primary_status === "PRE_APPROVAL_PENDING" ? (
                  <Text className="text-progress"> IN PROGRESS</Text>
                ) : primary_status === "INCOMPLETE" ? (
                  <Text className="text-progress"> IN PROGRESS </Text>
                ) : primary_status === "UNDER_REVIEW" ? (
                  <Text className="text-progress"> IN PROGRESS </Text>
                // ) : primary_status === "PRE_APPROVAL_PENDING" ? (
                //   <Text className="text-warning"> IN PROGRESS</Text>
                ) : (
                  <Text className="text-danger"> INACTIVE </Text>
                )}
                 </>
              )}
            </Text>
          </Col>
        </Col>
        <Col>
          <Col className="mob-credit-available-container">
            <Text
              // className={
              //   ruipiCheck
              //     ? "available-heading-text-active"
              //     : "available-heading-text-inactive"
              // }
              className={
                ruipiCheck ? "available-heading-text-active" : 
                  ["PRE_APPROVED", "PRE_APPROVAL_PENDING", "INCOMPLETE", "UNDER_REVIEW"].includes(primary_status) ? "available-heading-text-incomplete" : "available-heading-text-inactive"
              }
            >
              Available balance
            </Text>
            <Text
              // className={
              //   ruipiCheck ? "available-text-active" : "available-text-inactive"
              // }
              className={
                ruipiCheck ? "available-text-active" : 
                  ["PRE_APPROVED", "PRE_APPROVAL_PENDING", "INCOMPLETE", "UNDER_REVIEW"].includes(primary_status) ? "available-text-incomplete" : "available-text-inactive"
              }
            >
              ₹ {(available_balance || 0).toFixed(2) || 0}
            </Text>
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default MobCreditCard;
