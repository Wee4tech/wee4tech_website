import React from "react";
import { Col, Popover, Steps } from "antd";
import { ReactComponent as QualityProductIcon } from "../../assets/icons/QualityProductIcon.svg";
import { ReactComponent as DelieveryTailIcon } from "../../assets/icons/DelieveryTailIcon.svg";
import { ReactComponent as DeliveredIcon } from "../../assets/icons/DeliveredIcon.svg";
import "./CustomSteps.css";
import { dateFormat } from "../../commonFuntions/CommonUtilFunctions";

// const description = "You can hover on the dot.";
const CustomSteps = (props) => {
  const { trackingList, order_placed } = props;
  const currentValue = trackingList?.length;
  const orderTrackList = [
    {
      title: "Order placed",
      // description,
      icon: <QualityProductIcon />,
    },
    {
      title: "Sorting best quality products",
      // description,
      icon: <QualityProductIcon />,
    },
    {
      title: "Out for delivery",
      // description,
      icon: <DelieveryTailIcon />,
    },
    {
      title: "Delivered",
      // description,
      icon: <DeliveredIcon style={{ background: "#fff" }} />,
    },
  ];
  const customDot = (dot, { status, index }) => (
    <Popover>
      {index > currentValue && <div className="empty-dot" />}
      {index < currentValue && dot}
      {index === currentValue && (
        <Col className="sub-order-icon-wrapper">
          {orderTrackList[currentValue]?.icon}
        </Col>
      )}
    </Popover>
  );
  return (
    <>
      <Steps
        current={currentValue}
        progressDot={customDot}
        direction="horizontal" // Optional: set the direction explicitly (default is horizontal)
      >
        {orderTrackList.map((step, index) => (
          <Steps.Step
            className={
              index < currentValue
                ? "custom-step-parent"
                : "custom-step-parent-grey"
            }
            key={index}
            title={step?.title}
            description={
              index === 0
                ? dateFormat(order_placed)
                : trackingList[index - 1]?.created_at
                ? dateFormat(trackingList[index - 1]?.created_at)
                : ""
            }
            // description={step?.description}
          />
        ))}
      </Steps>
    </>
  );
};
export default CustomSteps;
