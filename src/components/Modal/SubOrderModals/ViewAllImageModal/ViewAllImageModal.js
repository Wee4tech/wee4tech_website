import React, { Fragment } from "react";
import "./ViewAllImageModal.css";
import {
  Avatar,
  //  Button,
  Col,
  // Input,
  Modal,
  // Rate,
  Row,
  Typography,
} from "antd";

const ViewAllImageModal = (props) => {
  const { isModalOpen, handleCancel, imageList } = props;
  const { Text } = Typography;
  return (
    <>
      <Modal
        onCancel={handleCancel}
        title={"All items"}
        // open={true}
        open={isModalOpen}
        style={{ color: "#0a243f", padding: "0px" }}
        footer={[]}
      >
        <Col className="myAccountModalContentParent">
          {imageList?.map((value, index) => {
            return (
              <Fragment key={index}>
                <Col className="content-item-main-parent">
                  <Row className="content-item-parent">
                    <Col className="content-item-parent-image-button-parent-modal">
                      <Avatar
                        src={
                          value?.product_image !== "No Image"
                            ? value?.product_image
                            : ""
                        }
                        shape="square"
                        style={{
                          height: "66px",
                          width: "66px",
                          position: "relative",
                        }}
                        alt="item"
                      />

                      <Row className="content-item-title-parent">
                        <Text className="content-item-title">
                          {value?.product_name}
                        </Text>

                        <Row className="content-item-qunatity-parent">
                          {!!value?.price_after_tax && (
                            <Text className="content-item-qunatity">
                              ₹ {Number(value?.price_after_tax).toFixed(2)}
                            </Text>
                          )}
                          {!!value?.quantity && (
                            <Text className="content-item-qunatity">
                              Qty. {value?.quantity}
                            </Text>
                          )}
                        </Row>
                      </Row>
                    </Col>

                    {/* {value.refundable ? (
                    <Row className="content-item-button-parent">
                  <Button 
                  // onClick={handleOpenReturnModal}
                  >Return</Button>
                  <Button 
                  // onClick={() => handleSelectedProduct(value)}
                  >
                    Exchange
                  </Button>
                </Row>
              ) : (
                <Row className="content-item-button-parent">
                  <Button>Exchange</Button>
                </Row>
              )} */}
                  </Row>
                  {/* <Row className="content-item-return-desc-parent"> */}
                  {/* <Row className="content-item-return-desc">
                <Col className="content-item-bullet"></Col>
                <Text className="content-item-qunatity">
                  {value.returnDesc}
                </Text>
              </Row> */}
                  {/* <Row className="rating-component-star">
                <Row className="rating-component-content-parent">
                  <Rate defaultValue={value.defaulStar} className="rate" />
                  {!value.defaulStar && (
                    <Text className="content-item-qunatity">Rate Product</Text>
                    )}
                </Row>

                {!value.refundable && (
                  <Row className="rating-input-parent">
                    <Input className="content-item-input" />
                    <Button className="editAddressFooterButton">Submit</Button>
                  </Row>
                )}
              </Row> */}
                  {/* </Row> */}

                  <Col className="cartSectionDivider"></Col>
                </Col>
              </Fragment>
            );
          })}
        </Col>
      </Modal>
    </>
  );
};

export default ViewAllImageModal;
