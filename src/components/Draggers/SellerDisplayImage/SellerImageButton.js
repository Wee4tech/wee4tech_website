import {
  Avatar,
  Button,
  Col,
  //  Typography,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
// import { ReactComponent as RemoveIcon } from "../../../assets/icons/RemoveImageIcon.svg";
import { ReactComponent as DefaultIcon } from "../../../assets/icons/default.svg";
import "./SellerImageButton.css";
import { baseUrl } from "../../../commonUtils/commonUtils";
const SellerImageButton = (prop) => {
  const { data, handleChildFieldChange, name } = prop;
  const [fileList, setFileList] = useState([]);
  const [info, setInfo] = useState(null);

  const handleFileChange = async (info) => {
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
  useEffect(() => {
    const file = info?.fileList[0];
    let url = file?.originFileObj;
    const inputValues = {
      [name]: url,
    };

    handleChildFieldChange(inputValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, fileList]);
  useEffect(() => {
    if (data?.seller_display_image) {
      let list = [];
      list.push({
        uid: "-1",
        name: "image.png",
        id: data.id,
        status: "done",
        url: data?.seller_display_image,
      });
      setFileList(list);
    }
  }, [data]);

  const props = {
    name: "image",
    action: "",
    beforeUpload: () => false,
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: "Download",
      showRemoveIcon: true,
      removeIcon: <CloseOutlined />,
    },
    accept: ".png,.jpeg,.jpg,image/png,image/jpeg,image/jpg",
  };

  const listCondition = fileList?.length === 0;

  // const handleRemoveFile = (file) => {
  //   const newFileList = fileList.filter(
  //     (f) => f.uid !== file.uid || f.id !== file.id
  //   );
  //   // setFileList(newFileList);
  //   handleImageDelete(file, newFileList);
  // };

  // const handleImageDelete = async (file, newFileList) => {
  //   // const { id: imageId } = file;
  //   // const param = {
  //   //   image_id: imageId,
  //   // };
  // };

  const customFileListRender = (fileList) => {
    return (
      <>
        {fileList.map((item, indx) => {
          return (
            <Col
              style={{
                marginBottom: "10px",
              }}
            >
              <Avatar
                className="styled-avatar"
                shape="square"
                src={
                  item.originFileObj
                    ? URL.createObjectURL(item.originFileObj)
                    : `${baseUrl}${item?.url}`
                }
                icon={<DefaultIcon width={20} height={20} />}
              />
              {/* <Col
                className="cross-wrapper"
                onClick={() => handleRemoveFile(item)}
              >
                <RemoveIcon />
              </Col> */}
            </Col>
          );
        })}
      </>
    );
  };

  return (
    <Col style={{ width: "100%" }}>
      <Col className="btn-container">
        <Upload
          {...props}
          className="upload-list"
          showUploadList={false}
          onChange={(info) => handleFileChange(info)}
        >
          {/* <Progress
            type="line"
            percent={
              fileList.status === "done"
              ? 100
              : Math.floor(fileList[fileList.length - 1]?.percent)
            }
            status={fileList.status === "done" ? "success" : "active"}
          /> */}
          <Col className="style-btn">
            {fileList.length > 9 ? (
              ""
            ) : (
              <Button icon={<UploadOutlined />}>Add Image</Button>
            )}
          </Col>
        </Upload>
      </Col>
      <Col style={{ textAlign: "center" }}>
        {!listCondition && <>{customFileListRender(fileList)}</>}
      </Col>
    </Col>
  );
};

export default SellerImageButton;
