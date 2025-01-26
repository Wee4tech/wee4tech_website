import React, { useState } from "react";
import {
  Button,
  Col,
  Upload,
  Typography,
  List,
  Avatar,
  Spin,
  Progress,
} from "antd";
import { ReactComponent as Camera } from "../../assets/icons/camera.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/RemoveImageIcon.svg";
import { ReactComponent as UploadIcon } from "../../assets/icons/uploadIcon.svg";
import { LoadingOutlined } from "@ant-design/icons";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../NotificationToast/NotificationToast";
import { bytesToSize } from "../../commonFuntions/CommonUtilFunctions";
import { useSelector } from "react-redux";
import { apiBaseUrl } from "../../commonUtils/commonUtils";

const { Dragger } = Upload;
const { Text } = Typography;

const ImageDragger = ({
  uploadImageApi,
  isLoading,
  multipleImages,
  imageList,
  setUploadedAllImages,
}) => {
  const [fileList, setFileList] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const token =
    useSelector((state) => state.loginAuthReducer.authToken) ||
    localStorage.getItem("accessToken");

  const handleFileChange = (info) => {
    // if (checkFileLimit(fileList)) {
    setFileList([...info?.fileList]);
    // }
    // }
  };
  const handleUploadCurrentImage = async (item) => {
    showInfoToast("Uploading the image");
    const fileDataResponse = await uploadImageApi([item.originFileObj]);
    if (fileDataResponse?.data?.status === true) {
      showSuccessToast(fileDataResponse?.data?.message);
      setProgressPercentage(0);
      // setFileList([]);
      const newFileList = fileList.filter((f) => f.uid !== item.uid);
      setFileList(newFileList);
    } else {
      showErrorToast(
        fileDataResponse?.data?.message || fileDataResponse?.error?.error
      );
      // setFileList([]);
    }
  };

  const handleCancelUpload = () => {
    setFileList([]);
    setProgressPercentage(0);
  };

  const handleUploadAllImages = async (items) => {
    // if (items?.length > 6) {
    //   showErrorToast("You Cannot Upload more then 50 files at once");
    //   return;
    // }

    showInfoToast("Uploading the images");
    const list = [];
    items?.map((element) => list?.push(element.originFileObj));
    const formData = new FormData();
    for (let i = 0; i <= list.length - 1; i++) {
      formData.append("images", list[i]);
    }

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgressPercentage(percentComplete);
        // progressBar.style.width = percentComplete + '%';
        // progressText.innerText = percentComplete.toFixed(2) + '%';
      }
    };

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const responseText = xhr.responseText;
          const responseData = JSON.parse(responseText);
          showSuccessToast("File uploaded successfully");
          // showSuccessToast(fileDataResponse?.data?.message);
          setProgressPercentage(0);
          // clearInterval(interval);
          setUploadedAllImages(responseData);
          setFileList([]);
          // result.innerHTML = 'File uploaded successfully.';
        } else {
          // result.innerHTML = 'File upload failed.';
        }
      }
    };

    xhr.open(
      "POST",
      `${apiBaseUrl}/api/product/products_catalogue/upload_product_images/`,
      true
    );
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.send(formData);

    // const fileDataResponse = await uploadImageApi(list);

    // //////////////////////////////////////////////
    // let progress = 0;
    // const interval = setInterval(() => {
    //   if (progress < 100) {
    //     progress = progress + 1;
    //     setProgressPercentage(progress);
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 100);
    // ///////////////////////////////
    // if (fileDataResponse?.data?.status === true) {
    //   showSuccessToast(fileDataResponse?.data?.message);
    //   setProgressPercentage(100);
    //   clearInterval(interval);
    //   setFileList([]);
    // } else {
    //   showErrorToast(
    //     fileDataResponse?.data?.message || fileDataResponse?.error?.error
    //   );
    //   setFileList([]);
    //   setProgressPercentage(0);
    //   clearInterval(interval);
    // }
  };

  const handleRemoveFile = (file) => {
    // Remove the file from the fileList
    const newFileList = fileList?.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);
    // messageApi.open({
    //   type: "success",
    //   content: "File removed successfully",
    // });
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  const customFileListRender = (fileList) => {
    return (
      <List
        dataSource={fileList}
        style={{
          marginTop: "30px",
        }}
        renderItem={(item) => {
          return (
            <>
              <Col
                style={{
                  height: "90px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 16px",
                  border: "1px solid #bac7d5",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                <Col
                  style={{ display: "flex", gap: "30px", alignItems: "center" }}
                >
                  {/* <Col> */}
                  <Avatar
                    shape="square"
                    style={{ width: "60px", height: "60px" }}
                    src={URL?.createObjectURL(item?.originFileObj)}
                  />
                  {/* </Col> */}
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
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        color: "#0a243f",
                        fontSize: "14px",
                        fontWeight: 400,
                        opacity: 0.6,
                        marginRight: "36px",
                      }}
                    >
                      {bytesToSize(item?.size)}
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
                  <Button
                    style={{
                      background: "#f5f5f5",
                      color: "#0a243f",
                      fontWeight: 500,
                      fontSize: "14px",
                      border: "none",
                    }}
                    icon={<UploadIcon />}
                    onClick={() => handleUploadCurrentImage(item)}
                  >
                    Upload
                  </Button>
                  <RemoveIcon onClick={() => handleRemoveFile(item)} />
                </Col>
              </Col>
            </>
          );
        }}
      />
    );
  };

  const listCondition = fileList?.length === 0;

  // const checkFileLimit = (fileList) => {
  //   if (fileList.length > MAX_COUNT) {
  //     const errorText = `You can only upload up to ${MAX_COUNT} images.`;

  //     showErrorToast(errorText);
  //     return false;
  //   }
  //   return true;
  // };

  // const beforeUpload = (file, fileList) => {
  //   return checkFileLimit(fileList);
  // };

  return (
    <>
      <Col
        style={{
          width: "60%",
          border: "1px solid #dedede",
          borderRadius: "8px",
          boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.16)",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <Col
          style={{
            height: "200px",
          }}
        >
          <Dragger
            fileList={fileList}
            // beforeUpload={beforeUpload}
            beforeUpload={() => false}
            onChange={(info) => handleFileChange(info)}
            className="custom-multiple-image-dragger"
            style={{
              borderRadius: "8px",
              backgroundColor: "#fff",
              border: "2px dashed #dedede",
            }}
            showUploadList={false}
            multiple={multipleImages}
            accept=".png,.jpeg,.jpg,image/png,image/jpeg,image/jpg"
            maxCount={100}
          >
            <Col>
              <Col
                style={{
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                <Camera />
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
                  Supported formats(.png,.jpeg,.jpg)
                </p>
              </Col>
            </Col>
          </Dragger>
        </Col>
        <Col
          style={{
            display: "flex",
            width: "100%",
            justifyContent: !listCondition ? "space-between" : "flex-end",
            marginTop: "40px",
          }}
        >
          {!listCondition && (
            <Col style={{ display: "flex", flexDirection: "column" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#0a243f",
                }}
              >
                {`${fileList?.length} images selected`}
              </Text>
              {progressPercentage > 0 ? (
                <>
                  <Progress
                    percent={progressPercentage || 0}
                    status={progressPercentage === 100 ? "success" : "active"}
                    showInfo={false}
                    style={{
                      width: "100px",
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      color: "#6c7b8b",
                    }}
                  >
                    Uploading
                  </Text>
                </>
              ) : (
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#6c7b8b",
                  }}
                >
                  Not uploaded
                </Text>
              )}
            </Col>
          )}
          <Col style={{ display: "flex", gap: "16px" }}>
            <Button
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#0a243f",
                height: "40px",
                borderRadius: "8px",
              }}
              onClick={handleCancelUpload}
              disabled={isLoading}
            >
              CANCEL
            </Button>
            <Button
              size="large"
              style={{
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: "500",
                width: "160px",
                color: "#fff",
                backgroundColor: listCondition ? "#9da7b2" : "#0354a3",
                borderRadius: "8px",
              }}
              onClick={() => handleUploadAllImages(fileList)}
              disabled={listCondition || isLoading}
            >
              {isLoading ? (
                <Spin indicator={antIcon} style={{ color: "#fff" }} />
              ) : (
                `UPLOAD ALL IMAGES`
              )}
            </Button>
          </Col>
        </Col>
        {!listCondition && <Col>{customFileListRender(fileList)}</Col>}
      </Col>
    </>
  );
};

export default ImageDragger;
