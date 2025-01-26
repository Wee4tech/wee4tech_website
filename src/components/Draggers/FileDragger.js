import React from "react";
import { Button, Col, Spin, Upload } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const FileDragger = (props) => {
  const {
    uploadedFile,
    fileUpload,
    fileList,
    customFileListRender,
    handleFile,
    isLoading,
    type,
  } = props;
  const { Dragger } = Upload;
  const loadingState = isLoading;
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  return (
    <Col
      style={{
        width: "60%",
        border: "1px solid #dedede",
        borderRadius: "8px",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.16)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <Col>
        <Dragger
          name="file"
          multiple={false}
          beforeUpload={() => false}
          className="custom-dragger"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "2px dashed #dedede",
            margin: "0px",
          }}
          onChange={(e) => uploadedFile(e)}
          showUploadList={false}
          accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        >
          <Col>
            <Col
              style={{
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              <p className="ant-upload-drag-icon">
                <img src={fileUpload} alt="" />
              </p>
              <p className="ant-upload-text">
                Drop your files here or{" "}
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
                Supported formats(.xls,.xlsx)
              </p>
            </Col>
          </Col>
        </Dragger>
      </Col>

      <Col>
        {fileList?.length > 0 && <Col>{customFileListRender(fileList)}</Col>}
      </Col>
      <Col
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="large"
          style={{
            fontFamily: "Inter",
            fontSize: "12px",
            fontWeight: "500",
            color: "#fff",
            backgroundColor: fileList?.length === 0 ? "#9da7b2" : "#0354a3",
            marginRight: "24px",
            borderRadius: "8px",
            width: "110px",
          }}
          onClick={handleFile}
          disabled={fileList?.length === 0 || loadingState ? true : false}
        >
          {loadingState ? (
            <Spin indicator={antIcon} style={{ color: "#fff" }} />
          ) : (
            `${type} FILE`
          )}
        </Button>
      </Col>
    </Col>
  );
};

export default FileDragger;
