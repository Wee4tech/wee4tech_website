import React from "react";
import { ReactComponent as AddToCatalogueIcon } from "../../../assets/icons/addToCatalogue.svg";
import { Button, Col, Modal } from "antd";
import "./AddToCatalogueModal.css";
const AddedToCatalogueModal = (props) => {
  const { item, open, handleOk,handleback } = props;

  return (
    <Modal
      //   style={{ maxHeight: "80vh", overflowY: "auto" }}
      className="add-image"
      open={open}
      style={{width:"600px"}}
      onOk={handleOk}
      onCancel={() => handleOk()}
      footer={[
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",           
            borderRadius: "0px 0px 16px 16px",
            height: "96px", 
            width:"600px",         
            backgroundColor: "#fff",
          }}
        >
          <Button
            onClick={() => handleback()}
             className="btn-cancel order-cancel-btn-style btnI"
          >
            GO BACK TO CATALOGUE
          </Button>
          <Button
            onClick={() => handleOk()}
            className="btn-theme btn-add-item btnI"
          >
            ADD MORE ITEMS
          </Button>
        </Col>,
      ]}
    >
      <Col className="icon-container">
        <AddToCatalogueIcon className="catalogue-icon" />
      </Col>
      <Col className="item-added">{`${
        item || 0
      } items added to your catalogue!`}</Col>
      <Col className="text">
        {"You can view these items in Catalogue and Inventory & price section"}
      </Col>
    </Modal>
  );
};

export default AddedToCatalogueModal;
