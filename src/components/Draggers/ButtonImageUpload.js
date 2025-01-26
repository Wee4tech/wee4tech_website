import {
  Avatar,
  Button,
  Col,
  //  Typography,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { ReactComponent as RemoveIcon } from "../../assets/icons/RemoveImageIcon.svg";
import { ReactComponent as DefaultIcon } from "../../assets/icons/default.svg";
import "./ButtonImageUpload.css";
import {
  useDeleteEditProductImageMutation,
  useEditProductImageMutation,
} from "../../apis/manageLibrary";
import {
  showErrorToast,
  showSuccessToast,
} from "../../NotificationToast/NotificationToast";
import { baseUrl } from "../../commonUtils/commonUtils";
const ButtonImageUpload = (prop) => {
  const { data } = prop;
  const [fileList, setFileList] = useState([]);
  const [
    editProductImageApi,
    // { data: uploadedImages }
  ] = useEditProductImageMutation();
  const [deleteEditProductImage] = useDeleteEditProductImageMutation();
  const handleFileChange = async (info) => {
    // let list = [...info.fileList];
    // setFileList([...fileList, list]);
    const params = {
      product: data.id,
      image: info.file,
    };
    const response = await editProductImageApi(params);
    if (response?.error) {
      showErrorToast(response?.error?.data?.message);
    } else {
      const data = response?.data?.data;
      showSuccessToast(response?.data?.message);
      setFileList([
        ...fileList,
        {
          uid: "-1",
          name: "",
          id: data.id,
          status: "done",
          url: data.image,
        },
      ]);
    }
  };

  useEffect(() => {
    if (data?.images?.length > 0) {
      let list = [];
      data?.images?.map((item) => {
        list.push({
          uid: "-1",
          name: "image.png",
          id: item.id,
          status: "done",
          url: item.image,
        });
        return null;
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

  const handleRemoveFile = (file) => {
    const newFileList = fileList.filter(
      (f) => f.uid !== file.uid || f.id !== file.id
    );
    // setFileList(newFileList);
    handleImageDelete(file, newFileList);
  };

  const handleImageDelete = async (file, newFileList) => {
    const { id: imageId } = file;
    const param = {
      image_id: imageId,
    };
    const response = await deleteEditProductImage(param);
    if (response?.error) {
      showErrorToast(response?.error?.data?.message);
    } else {
      const responseData = response?.data;
      showSuccessToast(responseData?.message);
      setFileList(newFileList);
    }
  };

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
              <Col
                className="cross-wrapper"
                onClick={() => handleRemoveFile(item)}
              >
                <RemoveIcon />
              </Col>
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
      <Col className="list-wrapper">
        {!listCondition && <>{customFileListRender(fileList)}</>}
      </Col>
    </Col>
  );
};

export default ButtonImageUpload;
