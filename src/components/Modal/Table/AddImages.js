import React, { useState } from "react";
import { message, Button, Col, Modal, Typography } from "antd";
import "./addImages.css";
import Dragger from "antd/es/upload/Dragger";
import { ReactComponent as FileUpload } from "../../../assets/icons/CameraIcon.svg";
import { useAddNewImageMutation } from "../../../apis/createQuote";

const { Title } = Typography;
const AddImages = ({
  addImageModal,
  setAddImageModal,
  showModal,
  handleOk,
  handleCancel,
  record,
  dataSource,
  setDataSource,
  currentIndexTable,
}) => {
  const [info, setInfo] = useState(null);
  const [fileList, setFileList] = useState(null);
  const [addImageApi] = useAddNewImageMutation();
  const handleFileChange = (info, record) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.filter((file) => {
      if (file.type.includes("image")) {
        return true;
      } else {
        message.error(`${file.name} is not a valid image file.`);
        return false;
      }
    });
    setInfo(info);
    setFileList(fileList);
  };
  const handleSave = async () => {
    const file = info.fileList[0];
    handleOk();
    const apiData = await addImageApi(file.originFileObj);
    if (apiData?.data?.status) {
      setDataSource((prevData) => {
        return prevData.map((table, index) => {
          return currentIndexTable === index
            ? table.map((item) => {
                if (item.key === record.key) {
                  return { ...item, imageURL: apiData?.data?.data.image };
                }
                return item;
              })
            : table;
        });
      });
    }
    setFileList(null);
  };
  return (
    <>
      <Modal
        className="add_image"
        title="Add images"
        open={addImageModal}
        onOk={handleOk}
        onCancel={() => {
          handleCancel();
          setFileList(null);
        }}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              borderTop: "1px solid #dedede",
              borderRadius: "0px 0px 16px 16px",
              padding: "20px 0px",
              boxShadow: "0 -6px 10px 0 rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              width:"100%"
            }}
          >
            <Button
              onClick={() => {
                handleCancel();
                setFileList(null);
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
              onClick={handleSave}
              style={{
                height: "48px",
                maxWidth: "200px",
                width: "100%",
                fontWeight: 500,
                fontSize: "14px",
                color: "white",
                backgroundColor: "#0354a3",
                border: "none",
              }}
            >
              SAVE
            </Button>
          </Col>,
        ]}
      >
        <Col
          style={{
            height: "400px",
            padding: "20px 30px",
          }}
        >
          <Title
            style={{
              color: "black",
              margin: "0 0 8px 0",
              fontSize: "16px",
              fontFamily: "Inter",
              fontWeight: 500,
            }}
          >
            {record?.input}
          </Title>
          <Col style={{ height: "160px" }}>
            <Dragger
              fileList={fileList}
              beforeUpload={() => false}
              onChange={(info) => handleFileChange(info, record)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "2px dashed #dedede",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <Col
                style={{
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                <Col style={{ marginBottom: "10px" }}>
                  <FileUpload />
                </Col>
                <Col
                  style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: 500,
                    marginBottom: "10px",
                  }}
                >
                  Drop your files here or{" "}
                  <Col
                    style={{
                      color: "#2973f0",
                      display: "inline",
                      marginLeft: "12px",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    browse
                  </Col>
                </Col>
                <Col
                  style={{
                    fontSize: "14px",
                    color: "#0a243f",
                    fontFamily: "Inter",
                    opacity: "0.6",
                  }}
                >
                  xls, doc, pdf, jpeg, png
                </Col>
              </Col>
            </Dragger>
          </Col>
        </Col>
      </Modal>
    </>
  );
};
export default React.memo(AddImages);
