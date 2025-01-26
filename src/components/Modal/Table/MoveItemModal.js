import React, { useState } from "react";
import { Button, Modal, Col, Radio, Typography } from "antd";
import { useSelector } from "react-redux";
import { bmpPriceSelector } from "../../../redux/slices/createQuote/selector";
const { Text } = Typography;
const MoveItemModal = ({
  moveRowsToTable,
  dataSource,
  selectedSeller,
  selectedRows,
}) => {
  const bmp_price = useSelector(bmpPriceSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("new_sub_order");
  const options = [];
  const selectedRowsCheck = [];
  selectedRows?.map((row) => {
    return selectedRowsCheck.push(row?.tableIndex);
  });
  selectedSeller?.map((item, index) => {
    if (!selectedRowsCheck?.includes(index) && item?.vendor_name) {
      options.push({
        id: index,
        label: item?.vendor_name,
        info: dataSource[index]?.length,
        subTotal: bmp_price[index]?.subTotal,
      });
    }
    return null;
  });

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const moveTableRows = (value) => {
    setIsModalOpen(false);
    moveRowsToTable(value);
  };

  return (
    <>
      <Button
        style={{
          width: "160px",
          height: "40px",
          borderRadius: "12px",
          color: "#fff",
          backgroundColor: "#015fe5",
        }}
        onClick={showModal}
      >
        Move items
      </Button>
      <Modal
        title="Where would you like to move these items"
        className="add_image"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              borderTop: "1px solid #dedede",
              borderRadius: "0px 0px 16px 16px",
              padding: "20px 0px",
              backgroundColor: "#fff",
              gap: "10px",
            }}
          >
            <Button
              onClick={() => {
                handleCancel();
              }}
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
              style={{
                height: "48px",
                maxWidth: "200px",
                width: "100%",
                fontWeight: 500,
                fontSize: "14px",
                color: "white",
                backgroundColor: "#015fe5",
                border: "none",
              }}
              onClick={() => moveTableRows(value)}
            >
              MOVE ITEMS
            </Button>
          </Col>,
        ]}
      >
        <Col
          style={{
            height: "300px",
            overflow: "auto",
            padding: "20px 30px",
          }}
        >
          <Radio.Group
            onChange={onChange}
            value={value}
            style={{ width: "100%" }}
          >
            {options?.map((option) => (
              <Col
                key={option?.id}
                style={{
                  width: "100%",
                  height: "80px",
                  padding: "14px 16px",
                  borderRadius: "16px",
                  border: `2px solid ${
                    value === option?.id ? "#0a243f" : "#f1f1f2"
                  }`,
                  background: `${value === option?.id ? "#f1f1f2" : "#fff"}`,
                  marginBottom: "12px",
                }}
              >
                <Radio value={option?.id}>
                  <Col style={{ paddingLeft: "16px" }}>
                    <Text
                      style={{
                        color: "#0a243f",
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      {option?.label ? option?.label : "No Seller Selected"}
                    </Text>
                    <Col style={{ display: "flex", gap: "20px" }}>
                      <Text
                        style={{
                          color: "#0a243f",
                          fontSize: "14px",
                          fontWeight: 400,
                        }}
                      >
                        Items added: {option?.info}
                      </Text>
                      <Text
                        style={{
                          color: "#0a243f",
                          fontSize: "14px",
                          fontWeight: 400,
                        }}
                      >
                        Subtotal: ₹{" "}
                        {option?.subTotal
                          ? parseFloat(option?.subTotal || 0).toFixed(2)
                          : 0}
                      </Text>
                    </Col>
                    {/* )} */}
                  </Col>
                </Radio>
              </Col>
            ))}
            <Col
              style={{
                width: "100%",
                height: "60px",
                padding: "16px 16px",
                borderRadius: "16px",
                border: `2px solid ${
                  value === "new_sub_order" ? "#0a243f" : "#f1f1f2"
                }`,
                background: `${value === "new_sub_order" ? "#f1f1f2" : "#fff"}`,
              }}
            >
              <Radio value={"new_sub_order"}>
                <Text
                  style={{
                    color: "#0a243f",
                    fontSize: "16px",
                    fontWeight: 500,
                    paddingLeft: "16px",
                  }}
                >
                  Add to a new suborder section
                </Text>
              </Radio>
            </Col>
          </Radio.Group>
        </Col>
      </Modal>
    </>
  );
};

export default React.memo(MoveItemModal);
