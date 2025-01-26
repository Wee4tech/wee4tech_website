import React from "react";
import "./CustomRFQSection.css";
import { Card, Col, Skeleton, Typography } from "antd";
import {
  RFQDate,
  RFQDetailContainer,
  RFQFileContainer,
  RFQFileText,
  RFQHeading,
  RFQID,
  RFQMainContainer,
  RFQTag,
  RowContainer,
} from "../../../modules/Request/RFQ/CreateQuote/CreateQuoteProfileSection/ProfileStyled";
import {
  
  dateFormat,
  handlePdfDownload,
} from "../../../commonFuntions/CommonUtilFunctions";
import { ReactComponent as FileIcon } from "../../../assets/icons/file.svg";
const { Text } = Typography;
const CustomRFQSection = (props) => {
  const { isLoading, title, data, editCondition, RFQ_ID } = props;

  const ID = RFQ_ID;
  const date = editCondition
    ? dateFormat(data?.rfq_order?.created_at)
    : dateFormat(data?.created_at);
  const full_name = editCondition
    ? ""
    : `${data?.first_name} ${data?.last_name}`;
  const phone_number = editCondition ? "no number" : data?.phone_number;
  const rfq_status = editCondition
    ? data?.rfq_order?.rfq_status
    : data?.rfq_status;
  //   ? rfq_order.rfq_id : userId;
  return (
    <>
      <Card bordered={false} style={{ width: "100%" }}>
        <RowContainer>
          <Col>
            <RFQHeading level={4}>{title}</RFQHeading>
          </Col>
          {isLoading ? (
            <>
              <Skeleton.Input block size={"large"} active />
            </>
          ) : (
            <RFQMainContainer>
              <RFQDetailContainer>
                <RFQDate></RFQDate>

                <RFQID>{ID}</RFQID>
                <RFQDate>{date}</RFQDate>
                {data?.rfq_file && (
                  <RFQFileContainer
                    onClick={() => handlePdfDownload(data?.rfq_file)}
                  >
                    <FileIcon />
                    <RFQFileText>View</RFQFileText>
                  </RFQFileContainer>
                )}
                <Text style={{ fontSize: "16px", color: "#0a243f" }}>
                  {full_name}
                </Text>
                <Text style={{ fontSize: "16px", color: "#0a243f" }}>
                  {phone_number}
                </Text>
              </RFQDetailContainer>

              <RFQTag>
                {rfq_status}
              </RFQTag>
            </RFQMainContainer>
          )}
        </RowContainer>
      </Card>
    </>
  );
};

export default CustomRFQSection;
