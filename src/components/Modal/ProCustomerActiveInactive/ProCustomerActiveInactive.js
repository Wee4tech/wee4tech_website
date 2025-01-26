import React from "react";
import "./ProCustomerActiveInactive.css";
import { Button, Col, Modal, Typography } from "antd";
import { ReactComponent as ActiveMobIcon } from "../../../assets/icons/modalProActive.svg";
import { ReactComponent as InActiveMobIcon } from "../../../assets/icons/modalInactiveIcon.svg";
const ProCustomerActiveInactiveModal = (props) => {
  const { Text } = Typography;
  const {
    open,
    handleOk = () => {},
    handleSave = () => {},
    // data = ""
    isActive,
  } = props;

  return (
    <>
      <Modal
        className="Cancel-Create-QuoteModal"
        title={""}
        onCancel={handleOk}
        open={open}
        footer={[
          <Col className="cancel-footer-container">
            <Button onClick={handleOk} className="cancel-button">
              CANCEL
            </Button>
            <Button
              onClick={() => handleSave()}
              className={`${
                isActive ? "cancel-delete-button-navy" : "cancel-delete-button"
              }`}
            >
              {isActive ? "YES, ACTIVATE" : "YES, DEACTIVATE"}
            </Button>
          </Col>,
        ]}
      >
        <Col className="container-modal">
          <Col>{isActive ? <ActiveMobIcon /> : <InActiveMobIcon />}</Col>
          <Text className="inner-text">
            {isActive
              ? "Activate mobPRO for this account?"
              : "Deactivate mobPRO for this account?"}
          </Text>
          <Text className="outer-text">
            {isActive
              ? "The user will be able to log in to PRO account and place orders."
              : "The user will not be able to log in to PRO account. They can still view and place order through their personal login."}
          </Text>
        </Col>
      </Modal>
    </>
  );
};

export default ProCustomerActiveInactiveModal;
