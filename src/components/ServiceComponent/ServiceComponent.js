import React from "react";
import {Col, Typography} from "antd";
import "./ServiceComponent.css";
import {ReactComponent as SettingServiceIcon} from "../../assets/icons/settingService.svg";

const ServiceComponent = (props) => {
  const {Text} = Typography;
  const {
    handleOpen = () => {},
    requestNumberCheck,
    requestNumber,
    openData,
    index
  } = props;
  return (
    <>
      <Col className="service-container" onClick={() => handleOpen(openData,index)}>
        <SettingServiceIcon />
        <Text className="service-container-text">Raise service request</Text>
        {requestNumberCheck && requestNumber && (
          <Text className="service-number-text">{requestNumber}</Text>
        )}
      </Col>
    </>
  );
};

export default ServiceComponent;
