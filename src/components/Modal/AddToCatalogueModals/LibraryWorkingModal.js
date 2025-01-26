import React from "react";
import { Button, Checkbox, Col, Modal, Typography } from "antd";
import "./LibraryWorkingModal.css";
import { ReactComponent as Icon2 } from "../../../assets/icons/modalIcon2.svg";
import { ReactComponent as Icon3 } from "../../../assets/icons/modalIcon3.svg";
import { ReactComponent as Icon1 } from "../../../assets/icons/modalIcon1.svg";
import { ReactComponent as Icon4 } from "../../../assets/icons/modalIcon4.svg";

const { Text } = Typography;
const LibraryWorkingModal = (props) => {
  const { open, handleOk } = props;
  return (
    <>
      <Modal
        className="LibraryWorkingModal"
        title={"Mad over buildings library"}
        onCancel={handleOk}
        open={open}
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
              width:"100%"
            }}
          >
            <Button
              onClick={handleOk}
              style={{
                height: "48px",
                fontWeight: 500,
                fontSize: "14px",
                maxWidth: "120px",
                width: "100%",
              }}
            >
              CANCEL
            </Button>
            <Button
              onClick={() => handleOk()}
              style={{
                height: "48px",
                maxWidth: "200px",
                width: "100%",
                fontWeight: 500,
                fontSize: "14px",
                border: "none",
                color: "white",
                backgroundColor: "#0354a3",
              }}
            >
              GOT IT!
            </Button>
          </Col>,
        ]}
      >
        <Col style={{ height: "450px", overflow: "auto" }}>
          <Col className="head-container">
            <Text className="heading">What is MOB library?</Text>
            <Text className="paragraph">
              MOB library is a collection of listings with all the basic details
              filled. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec nec sapien ut arcu tincidunt volutpat. Donec felis mauris,
              sodales ac varius eget, lacinia et tellus
            </Text>
          </Col>
          <Col style={{ height: "16px", backgroundColor: "#f1f1f2" }}></Col>
          <Col className="head-container work-text">
            <Text className="heading">How does it work?</Text>
          </Col>
          <Col className="container">
            <Col className="sub1">
              <Text className="heading">
                Search for product by name, brand and category
              </Text>
              <Text className="paragraph">
                Type the name of the item that you want to add. you can also
                find it by applying filters
              </Text>
            </Col>
            <Col className="sub2">
              <Icon4 />
            </Col>
          </Col>
          <Col className="container">
            <Col className="sub1">
              <Text className="heading">
                Click on the checkbox <Checkbox /> to select
              </Text>
              <Text className="paragraph">
                You can select the product by clicking the checkbox on the left
                side. To select all items click the checkbox on top of the table
              </Text>
            </Col>
            <Col className="sub2">
              <Icon3 />
            </Col>
          </Col>
          <Col className="container">
            <Col className="sub1">
              <Text className="heading">Edit details</Text>
              <Text className="paragraph">
                You can edit MRP, your selling price and stock
              </Text>
            </Col>
            <Col className="sub2">
              <Icon2 />
            </Col>
          </Col>
          <Col className="container">
            <Col className="sub1">
              <Text className="heading">Add to your catalogue</Text>
              <Text className="paragraph">Voila! your items are saved!</Text>
            </Col>
            <Col className="sub2">
              <Icon1 />
            </Col>
          </Col>
        </Col>
      </Modal>
    </>
  );
};

export default LibraryWorkingModal;
