import React, { useEffect, useState } from "react";
import { Col, Image, Row, Typography } from "antd";
import PartnerLogoIcon  from "../../../assets/icons/Wee4.png";
import "./SellerLogin.css";
import { Button, Form, Input, Spin } from "antd";
import { useAdminLoginMutation } from "../../../apis/login.js";

import {
  showErrorToast,
  showSuccessToast,
} from "../../../NotificationToast/NotificationToast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  getAuthToken,
  getLoginUserDetail,
} from "../../../redux/slices/loginAuth/action";

const SellerLogin = () => {
  const dispatch = useDispatch();
  const { Text } = Typography;
  const [otpModal, setOtpModal] = useState(true);
  const navigate = useNavigate();

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [sellerLoginApi, { isLoading }] = useAdminLoginMutation();

  const [emailOrPhone, setEmailOrPhone] = useState("");


// eslint-disable-next-line 
  const [ispageLoading, setispageLoading] = useState(false); 

  const handleLogin = async () => {
    // const response = await verifyOtpApi({
    //   email_or_phone: emailOrPhone,
    //   otp: otp,
    // });

    // if (response?.data?.status) {
    //   showSuccessToast(response.data.message);
    if (emailOrPhone === "it@wee4techsolutions.com") {
      localStorage.setItem("accessToken", "asfasdasdsadsadsaddfgdfg");
      localStorage.setItem("bmp_id", "1");
      localStorage.setItem("bmp_name", "Test");
      navigate("/dashboard");
    } else {
      showErrorToast("Invalid Credentials");
    }
    // } else if (!response.error.data.status) {
    //   showErrorToast(response.error.data.message);
    // }
  };

  const isAuthenticated = localStorage.getItem("accessToken") !== null;

  const onFinish = async (values) => {
    try {
      if (!otpModal) {
        const response = await sellerLoginApi({
          email_or_phone: values.username,
          password: values.password,
        });

        if (response?.data?.status) {
          const UserId = response?.data?.data?.access;         
          localStorage.setItem("UserId", UserId);
          setIsEmailValid(true);         
          dispatch(getLoginUserDetail(response?.data?.data));
          setOtpModal(false);
          showSuccessToast(response?.data?.message);
        } else {
          const errorMsg =
            response?.data?.message || response?.error?.data?.data?.email[0];
          if (response?.error?.data?.data?.email[0]) {
            setIsEmailValid(false);
          } else {
            setIsEmailValid(true);
          }
          showErrorToast(errorMsg);
        }
      }
    } catch (error) {
      showErrorToast(error);
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    const bmp_id = localStorage.getItem("bmp_id");
    if (isAuthenticated && bmp_id) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ispageLoading ? (
    <>
      <div className="full-page-loader text-center">
        <Spin />
      </div>
    </>
  ) : (
    <>
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Row
            className="register-topbutton"
            style={{ display: "flex", justifyContent: "left" }}
          >
            <Col
              className=""
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
            >
              <a href="/login">
              <Image src={PartnerLogoIcon} preview={false} width={180}   style={{  paddingTop: "1rem" }}></Image>
                {/* <PartnerLogoIcon
                  style={{ height: "40px", paddingTop: "1rem" }}
                /> */}
              </a>
            </Col>
          </Row>
          <div
            className="Seller-login-card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
              width: "100%",
            }}
          >
            <Row>
              <Col span={24} className="Seller-login-conatiner">
                {/* {!forgetPassword ? ( */}
                <>
                  <Col
                    style={{
                      paddingBottom: "20px",
                      textAlign: "center",
                      padding: "20px 26px",
                    }}
                  >
                    <Text style={{ fontSize: "20px", fontWeight: 500 }}>
                      Log in
                    </Text>
                  </Col>
                  <Form
                    name="basic"
                    style={{
                      maxWidth: 500,
                      padding: "20px 26px",
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item label="Mobile Number / Email Id">
                      <Form.Item
                        label="Mobile Number / Email Id"
                        name="username"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input your Mobile Number / Email Id",
                          },
                        ]}
                      >
                        <Input
                          // type="number"
                          // inputMode="numeric"
                          maxLength={100}
                          className={isEmailValid ? "custom-input" : ""}
                          style={{
                            height: "40px",
                            borderColor: isEmailValid ? "" : "#bf2600",
                            backgroundColor: isEmailValid ? "" : "#ffebe6",
                          }}
                          onChange={(e) => setEmailOrPhone(e.target.value)}
                        />
                      </Form.Item>
                    </Form.Item>
                    <Form.Item label="Password">
                      <Form.Item
                        label="Password"
                        name="password"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password
                          className="custom-input-pass"
                          style={{ height: "40px" }}
                        />
                      </Form.Item>
                    </Form.Item>
                    {/* <Col style={{ textAlign: "right" }}>
                          <Text
                            onClick={handleForgetPassword}
                            style={{ cursor: "pointer", color: "#2973f0" }}
                          >
                            Forgot password?
                          </Text>
                        </Col> */}

                    <Form.Item>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "0354a3",
                          height: "40px",
                          fontWeight: 500,
                        }}
                        type={"primary"}
                        htmlType="submit"
                        onClick={handleLogin}
                        loading={isLoading}
                      >
                        LOGIN
                      </Button>
                    </Form.Item>
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    ></Col>
                  </Form>
                </>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SellerLogin;
