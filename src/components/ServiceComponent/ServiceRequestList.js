import React from "react";
import {Col, Button, Typography, Tag} from "antd";
import "./ServiceComponent.css";
import {
 
  dateFormat,
} from "../../commonFuntions/CommonUtilFunctions";

const ServiceRequestList = (props) => {
  const {data, handleOpenView} = props;
  const {Text} = Typography;
  return (
    <>
      <Col className="service-list-main-Wrapper">
        {data?.map((item) => {
          return (
            <>
              <Col className="service-list-main-sub-Wrapper">
                <Col className="service-list-details">
                  <Col className="service-list-details-sub">
                    <Text className="service-list-details-sub-service-id">
                      {item?.service_request_id}
                    </Text>
                    <Text className="service-list-details-sub-service-date">
                      {item?.created_at ? dateFormat(item?.created_at) : "N/A"}
                    </Text>
                  </Col>
                  <Col className="service-list-details-sub-type-container">
                    <Text className="service-list-details-sub-service-id">
                      {item?.issue_type}
                    </Text>
                    <Col className="service-list-details-sub-type-tag-container">
                      <Tag
                        style={{padding: "8px", height: "36px"}}
                       >
                        {item?.status}
                      </Tag>
                    </Col>
                  </Col>
                </Col>
                <Col>
                  <Button
                    className="service-list-main-sub-Wrapper-view-button"
                    onClick={() => handleOpenView(item)}>
                    View
                  </Button>
                </Col>
              </Col>
            </>
          );
        })}
      </Col>
    </>
  );
};

export default ServiceRequestList;
