import React from "react";
import "./CustomImageContainer.css";
import { Avatar, Col, Row, Typography } from "antd";

const CustomImageContainer = (props) => {
  const {
    imageList = [],
    displayImage = 2,
    quantity = true,
    handleClick = () => {},
    paramData = [],
  } = props;
  const { Text } = Typography;
  return (
    <>
      <Row className="sub-order-images-container">
        {imageList?.length <= displayImage ? (
          <>
            {imageList?.map((item, indx) => {
              return (
                <>
                  <Col
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Avatar
                      className="sub-order-images-avatar"
                      shape="square"
                      src={item?.product_image}
                      // icon={<DefaultIcon width={20} height={20} />}
                    />
                    {quantity && (
                      <Col
                        className="sub-order-images-quantity-wrapper"
                        // onClick={() => handleRemoveFile(item)}
                      >
                        {item?.quantity}
                      </Col>
                    )}
                  </Col>
                </>
              );
            })}
          </>
        ) : (
          <>
            {imageList?.map((item, index) => {
              return (
                <>
                  {index < displayImage ? (
                    <Col
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <Avatar
                        className="sub-order-images-avatar"
                        shape="square"
                        src={item?.product_image}
                        // icon={<DefaultIcon width={20} height={20} />}
                      />
                      {quantity && (
                        <Col
                          className="sub-order-images-quantity-wrapper"
                          // onClick={() => handleRemoveFile(item)}
                        >
                          {item?.quantity}
                        </Col>
                      )}
                    </Col>
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
            <Col
              className="more-image-avatar"
              onClick={() => handleClick(paramData)}
            >
              <Text className="more-text">
                + {imageList?.length - displayImage} more
              </Text>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default CustomImageContainer;
