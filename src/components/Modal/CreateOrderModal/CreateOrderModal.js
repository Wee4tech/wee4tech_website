import React from "react";
import {Button, Col, Collapse, Modal, Typography} from "antd";
import {useSelector} from "react-redux";
import "./CreateOrderModal.css";
import CustomCarousel from "../../CustomCarousel/CustomCarousel";
import {createOrderModalProductDataSelector} from "../../../redux/slices/createOrder/selector";

const CreateOrderModal = ({open, handleOk, handleSave, saveText}) => {
  const {Title, Text} = Typography;
  const rowData = useSelector(createOrderModalProductDataSelector);
  const productData = [
    {
      key: "1",
      label: (
        <Col style={{borderBottom: "1px solid #dedede"}}>
          {"Product Details"}
        </Col>
      ),
      children: (
        <Col
          style={
            {
              // height: "100px",
              // overflow: "auto",
            }
          }>
          {rowData?.product_description ||
            ""}
        </Col>
      ),
      //   extra: genExtra(),
    },
  ];

  const specsData = [
    {
      key: "1",
      label: (
        <Col style={{borderBottom: "1px solid #dedede"}}>
          {"Specifications"}
        </Col>
      ),
      children: (
        <Col
          style={
            {
              // height: "100px",
              //  overflow: "auto"
            }
          }>
          {rowData?.special_features}
        </Col>
      ),
      //   extra: genExtra(),
    },
  ];

  return (
    <Modal
      //   style={{ maxHeight: "80vh", overflowY: "auto" }}
      className="carousel-modal"
      // title="Select flagging reason"
      open={open}
      onOk={handleOk}
      onCancel={() => {
        handleOk();
        //     handleCancel();
        //     setFileList(null);
      }}
      title={[
        <Text style={{color: "#0a243f", fontSize: "18px", fontWeight: 500}}>
          Item details
        </Text>,
      ]}
      footer={[
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            borderTop: "1px solid #dedede",
            borderRadius: "0px 0px 16px 16px",
            height: "96px",
            boxShadow: "0 -6px 10px 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            width: "100%",
          }}>
          <Button
            onClick={() => {
              handleOk();
              //   handleCancel();
              //   setFileList(null);
            }}
            style={{
              height: "48px",
              fontWeight: 500,
              fontSize: "14px",
              maxWidth: "120px",
              width: "100%",
            }}>
            CANCEL
          </Button>
          <Button
            onClick={() => handleSave(rowData)}
            style={{
              height: "48px",
              maxWidth: "200px",
              width: "100%",
              fontWeight: 500,
              fontSize: "14px",
              color: "white",
              backgroundColor: "#0354a3",
              border: "none",
            }}>
            {saveText || "Select"}
          </Button>
        </Col>,
      ]}>
      <Col
        style={{
          height: "430px",
          overflow: "auto",
          // padding: "20px 30px",
        }}>
        <Col
          style={{
            // height: "400px",
            padding: "20px 30px",
          }}>
          <Col
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}>
            <Col style={{width: "40%"}}>
              <CustomCarousel products={rowData?.images} />
            </Col>
            <Col>
              <Title
                style={{
                  color: "#0a243f",
                  // margin: "0 0 8px 0",
                  fontSize: "14px",
                  fontWeight: 400,
                }}>
                Brand: {rowData?.brand_name || rowData?.brand || "N/A"}
              </Title>
              <Title
                style={{
                  color: "#0a243f",
                  // margin: "0 0 8px 0",
                  fontSize: "14px",
                  fontWeight: 500,
                }}>
                {rowData?.item_name_title}
              </Title>
              <Title
                style={{
                  color: "#0a243f",
                  // margin: "0 0 8px 0",                  
                  fontSize: "14px",
                  fontWeight: 500,
                }}>
               RFQ: ₹ {(rowData?.vendor?.rfq_price || 0).toFixed(2)}           
              </Title>
              <Title
                style={{
                  color: "#0a243f",
                  // margin: "0 0 8px 0",
                  margin: "0px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}>             
               Selling Price: ₹ {(rowData?.vendor?.vendor_selling_price || 0).toFixed(2)}
              </Title>
              <Title
                style={{
                  color: "#0a243f",
                  fontSize: "14px",
                  fontWeight: 400,
                }}>
                Unit: {rowData?.unit || "N/A"}
              </Title>
              <Col className="hsn-main-container">
                <Title
                  style={{
                    color: "#0a243f",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}>
                  HSN: {rowData?.hsn_code}
                </Title>
                <Title
                  style={{
                    color: "#0a243f",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}>
                  MOBSKU: {rowData?.mob_sku}
                </Title>
                <Title
                  style={{
                    color: "#0a243f",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}>
                  SELLER: {rowData?.vendor?.vendor_name}{" "}
                  {rowData?.vendor?.bmp_id}
                </Title>
              </Col>
              <Text
                style={{color: "#0a243f", fontSize: "16px", fontWeight: 500}}>
                Category: {rowData?.category || "N/A"}
              </Text>
              <Title
                style={{
                  color: "#0a243f",
                  fontSize: "14px",
                  fontWeight: 400,
                }}>
                {`${rowData?.sub_category_id || "N/A"} > ${
                  rowData?.sub_category_id_2 || "N/A"
                }`}
              </Title>
            </Col>
          </Col>
        </Col>
        <Col style={{padding: "20px 30px"}}>
          {rowData?.product_description && (
            <Collapse
              className="collapse-style"
              defaultActiveKey={["0"]}
              // onChange={onChange}
              expandIconPosition={"end"}
              items={productData}
              ghost
            />
          )}

          {rowData?.special_features && (
            <Collapse
              className="collapse-style"
              defaultActiveKey={["0"]}
              // onChange={onChange}
              expandIconPosition={"end"}
              items={specsData}
              ghost
            />
          )}
        </Col>
      </Col>
    </Modal>
  );
};

export default CreateOrderModal;
