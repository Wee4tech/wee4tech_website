import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  //  message,
  Upload,
  List,
  Typography,
} from "antd";
// import { FileOutlined, CloseOutlined } from "@ant-design/icons";
import "./UploadPaymentModel.css";
import { ReactComponent as RemoveIcon } from "../../../assets/icons/RemoveImageIcon.svg";
import UploadPaymentConfirmationModal from "./UploadPaymentConfirmationModal";
import { bytesToSize } from "../../../commonFuntions/CommonUtilFunctions";
const { Dragger } = Upload;
const { Text } = Typography;

const UploadPaymentModel = (props) => {
  const { open, handleOk, onCancleModel } = props;
  const [fileList, setFileList] = useState([]);


  const [openModal, setOpenModal] = useState(open);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);
  const handleFileChange = (info) => {
 
    //  comment for now
    // let list = [...info.fileList];
    // list = list.slice(-1);

    setFileList([...info.fileList]);
  };
  const handleRemoveFile = (file) => {
    // Remove the file from the fileList
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);
    // messageApi.open({
    //   type: "success",
    //   content: "File removed successfully",
    // });
  };

  const handleConfirmationOk = () => {
    setOpenConfirmationModal(false);
  };
  const handleSave = () => {
    // setOpenConfirmationModal(false);
    // setOpenModal(false);
    // setFileList([]);
  };

  const onBack = () => {
    setOpenConfirmationModal(false);
    setOpenModal(true);
  };
  const customFileListRender = (fileList) => {
    return (
      <List
        dataSource={fileList}
        style={{
          marginTop: "10px",
        }}
        renderItem={(item) => {
          return (
            <>
              <Col
                style={{
                  height: "60px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 16px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                <Col
                  style={{ display: "flex", gap: "30px", alignItems: "center" }}
                >
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Text
                      style={{
                        color: "#0a243f",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {item.name}
                    </Text>
                  </Col>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Text
                    style={{
                      color: "#0a243f",
                      fontSize: "14px",
                      fontWeight: 400,
                      opacity: 0.6,
                    }}
                  >
                    {bytesToSize(item.size)}
                  </Text>
                  <RemoveIcon onClick={() => handleRemoveFile(item)} />
                </Col>
              </Col>
            </>
          );
        }}
      />
    );
  };
  return (
    <>
      <Modal
        title="Upload payments"
        open={openModal}
        onOk={() => {
          handleOk();
          setFileList([]);
        }}
        onCancel={() => {
          onCancleModel();
          setFileList([]);
        }}
        className="upload-payment-modal"
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              borderRadius: "0px 0px 16px 16px",
              height: "96px",
              backgroundColor: "#fff",
            }}
          >
            <Button
              style={{
                height: "48px",
                fontWeight: 500,
                fontSize: "14px",
                minWidth: "140px",
                width: "100%",
              }}
              onClick={() => {
                onCancleModel();
                setFileList([]);
              }}
            >
              CANCEL
            </Button>
          </Col>,

          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              borderRadius: "0px 0px 16px 16px",
              height: "96px",
            }}
          >
            <Button
              style={{
                height: "48px",
                fontWeight: 500,
                fontSize: "14px",
                minWidth: "250px",
                width: "100%",
                backgroundColor: "#0354a3",
                color: "#fff",
              }}
              onClick={() => {
                setOpenModal(false);
                setOpenConfirmationModal(true);
              }}
            >
              Save
            </Button>
          </Col>,
        ]}
      >
        <Dragger
          fileList={fileList}
          beforeUpload={() => false}
          onChange={(info) => handleFileChange(info)}
          className="custom-dragger"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "2px dashed #dedede",
          }}
          showUploadList={false}
          multiple={true}
          accept=".png,.jpeg,.jpg,image/png,image/jpeg,image/jpg"
        >
          <Col
            style={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col
              style={{
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              <p className="ant-upload-text">
                Drag your images here or{" "}
                <span
                  style={{
                    color: "#2973f0",
                    marginLeft: "12px",
                  }}
                >
                  browse
                </span>
              </p>
              <p
                className="ant-upload-hint"
                style={{
                  fontSize: "14px",
                }}
              >
                xls, doc, pdf, jpeg, png - upto 10 mb
              </p>
            </Col>
          </Col>
        </Dragger>
        <Col style={{ overflow: "auto", height: "150px" }}>
          {fileList?.length !== 0 && (
            <Col style={{ padding: "0px 24px" }}>
              {customFileListRender(fileList)}
            </Col>
          )}
        </Col>
      </Modal>
      <UploadPaymentConfirmationModal
        data={fileList}
        setFileList={setFileList}
        handleOk={handleConfirmationOk}
        onBack={onBack}
        open={openConfirmationModal}
        handleSave={handleSave}
      />
    </>
  );
};

export default UploadPaymentModel;
