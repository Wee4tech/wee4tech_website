import React from "react";
import { Col, Typography } from "antd";
import "./SellerCustomview.css";
import { ReactComponent as MobCreditBlackIcon } from "../../../assets/icons/mobCreditBlackIcon.svg";
import { ReactComponent as InactiveMobCreditBlackIcon } from "../../../assets/icons/inactiveMobCredit.svg";
import MobCreditApplyNowIcon from "../../../assets/seller/icons/credit-applynow.webp";
import { ReactComponent as MobCreditIcon } from "../../../assets/seller/icons/creditlogo_button.svg";

const MobCreditCard = (props) => {
  const { Text } = Typography;
  const { ruipiCheck, approved_balance, available_balance, rupifyData } = props;
  let primary_status =
    rupifyData?.primary_status || rupifyData?.rupifiDetails?.primary_status;
  return (
    <>
      {primary_status !== undefined && primary_status !== "REJECTED" ? (
        <Col
          // className={
          //   ruipiCheck
          //     ? "mob-credit-container-active"
          //     : "mob-credit-container-inactive"
          // }
          className={
            ruipiCheck
              ? "mob-credit-container-active"
              : [
                  "PRE_APPROVED",
                  "PRE_APPROVAL_PENDING",
                  "INCOMPLETE",
                  "UNDER_REVIEW",
                ].includes(primary_status)
              ? "mob-credit-container-incomplete"
              : "mob-credit-container-inactive"
          }
        >
          <Col className="mob-credit-icon-container">
            {ruipiCheck ? (
              <MobCreditBlackIcon />
            ) : (
              <InactiveMobCreditBlackIcon />
            )}
            <Col>
              <Text
                className={
                  ruipiCheck
                    ? "approved-text-active"
                    : [
                        "PRE_APPROVED",
                        "PRE_APPROVAL_PENDING",
                        "INCOMPLETE",
                        "UNDER_REVIEW",
                      ].includes(primary_status)
                    ? "approved-text-incomplete"
                    : "approved-text-inactive"
                }
              >
                {ruipiCheck ? (
                  <> Active: ₹ {(approved_balance || 0).toFixed(2) || 0}</>
                ) : (
                  <>
                    {/* <Text className="text-danger"> Account Inactive </Text> */}
                    {/* {data?.rupifiDetails && Object.keys(data?.rupifiDetails).length > 0 ? ( */}
                    {primary_status === "REJECTED" ? (
                      <Text className="text-danger"> REJECTED</Text>
                    ) : primary_status === "PRE_APPROVED" ? (
                      <Text className="text-progress"></Text>
                    ) : primary_status === "PRE_APPROVAL_PENDING" ? (
                      <Text className="text-progress"> </Text>
                    ) : primary_status === "INCOMPLETE" ? (
                      <Text className="text-progress"> </Text>
                    ) : primary_status === "UNDER_REVIEW" ? (
                      <Text className="text-progress"> </Text>
                    ) : primary_status === undefined ? (
                      <Text className="text-warning"> APPLY NOW</Text>
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
              {ruipiCheck ? (
                <>
                  <Text
                    // className={
                    //   ruipiCheck
                    //     ? "available-heading-text-active"
                    //     : "available-heading-text-inactive"
                    // }
                    className={"available-heading-text-active"}
                  >
                    Available balance
                  </Text>
                  <Text
                    // className={
                    //   ruipiCheck ? "available-text-active" : "available-text-inactive"
                    // }
                    className={"available-text-active"}
                  >
                    ₹ {(available_balance || 0).toFixed(2) || 0}
                  </Text>
                </>
              ) : (
                <>
                  {[
                    "PRE_APPROVED",
                    "PRE_APPROVAL_PENDING",
                    "INCOMPLETE",
                    "UNDER_REVIEW",
                  ].includes(primary_status) ? (
                    <>
                      <Text
                        className={
                          ruipiCheck
                            ? "available-heading-text-active"
                            : [
                                "PRE_APPROVED",
                                "PRE_APPROVAL_PENDING",
                                "INCOMPLETE",
                                "UNDER_REVIEW",
                              ].includes(primary_status)
                            ? "available-heading-text-incomplete"
                            : "available-heading-text-inactive"
                        }
                      >
                        IN PROGRESS
                      </Text>
                      <Text
                        // className={
                        //   ruipiCheck ? "available-text-active" : "available-text-inactive"
                        // }
                        className={
                          ruipiCheck
                            ? "available-text-active"
                            : [
                                "PRE_APPROVED",
                                "PRE_APPROVAL_PENDING",
                                "INCOMPLETE",
                                "UNDER_REVIEW",
                              ].includes(primary_status)
                            ? "available-text-incomplete"
                            : "available-text-inactive"
                        }
                      >
                        Pre approved, incomplete or under review
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text
                        // className={
                        //   ruipiCheck
                        //     ? "available-heading-text-active"
                        //     : "available-heading-text-inactive"
                        // }
                        className={"available-heading-text-inactive"}
                      >
                        Available balance
                      </Text>
                      <Text
                        // className={
                        //   ruipiCheck ? "available-text-active" : "available-text-inactive"
                        // }
                        className={"available-text-inactive"}
                      >
                        ₹ {(available_balance || 0).toFixed(2) || 0}
                      </Text>
                    </>
                  )}
                </>
              )}
            </Col>
          </Col>
        </Col>
      ) : (
        <>
          {primary_status === "REJECTED" ? (
            <>
              <Col
                // className={
                //   ruipiCheck
                //     ? "mob-credit-container-active"
                //     : "mob-credit-container-inactive"
                // }
                className={"mob-credit-container-inactive"}
              >
                <Col className="mob-credit-icon-container">
                  {ruipiCheck ? (
                    <MobCreditBlackIcon />
                  ) : (
                    <InactiveMobCreditBlackIcon />
                  )}
                  <Col>
                    <Text className={"approved-text-inactive"}>
                      <>
                        {/* <Text className="text-danger"> Account Inactive </Text> */}
                        {/* {data?.rupifiDetails && Object.keys(data?.rupifiDetails).length > 0 ? ( */}
                        {primary_status === "REJECTED" ? (
                          <Text className="text-danger"> REJECTED</Text>
                        ) : primary_status === "PRE_APPROVED" ? (
                          <Text className="text-progress"></Text>
                        ) : primary_status === "PRE_APPROVAL_PENDING" ? (
                          <Text className="text-progress"> </Text>
                        ) : primary_status === "INCOMPLETE" ? (
                          <Text className="text-progress"> </Text>
                        ) : primary_status === "UNDER_REVIEW" ? (
                          <Text className="text-progress"> </Text>
                        ) : primary_status === undefined ? (
                          <Text className="text-warning"> APPLY NOW</Text>
                        ) : (
                          <Text className="text-danger"> INACTIVE </Text>
                        )}
                      </>
                    </Text>
                  </Col>
                </Col>
                <Col>
                  <Col className="mob-credit-available-container">
                    <>
                      {[
                        "PRE_APPROVED",
                        "PRE_APPROVAL_PENDING",
                        "INCOMPLETE",
                        "UNDER_REVIEW",
                      ].includes(primary_status) ? (
                        <>
                          <Text className={"available-heading-text-inactive"}>
                            IN PROGRESS
                          </Text>
                          <Text
                            // className={
                            //   ruipiCheck ? "available-text-active" : "available-text-inactive"
                            // }
                            className={
                              ruipiCheck
                                ? "available-text-active"
                                : [
                                    "PRE_APPROVED",
                                    "PRE_APPROVAL_PENDING",
                                    "INCOMPLETE",
                                    "UNDER_REVIEW",
                                  ].includes(primary_status)
                                ? "available-text-incomplete"
                                : "available-text-inactive"
                            }
                          >
                            Pre approved, incomplete or under review
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text className={"available-heading-text-inactive"}>
                            Available balance
                          </Text>
                          <Text className={"available-text-inactive"}>
                            ₹ {(available_balance || 0).toFixed(2) || 0}
                          </Text>
                        </>
                      )}
                    </>
                  </Col>
                </Col>
              </Col>
            </>
          ) : (
            <>
              <Col className="mob-credit-black">
                <div className="mobcredit-banner">
                  <img
                    src={MobCreditApplyNowIcon}
                    className="bg-image-bag"
                    alt=""
                  />
                  <div className="banner-text-container">
                    <h1 className="banner-title">
                      {" "}
                      <MobCreditIcon />
                    </h1>
                    <p className="banner-subtitle">Get credit up to 50 Lakhs</p>
                  </div>
                  <div className="button-container">
                    <Text
                      className="hyperlink-text-white mobcredit-applynow"
                      onClick={() =>
                        window.open("/Seller/mobcreditonboarding", "_blank")
                      }
                    >
                      APPLY NOW
                    </Text>
                  </div>
                </div>
              </Col>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MobCreditCard;
