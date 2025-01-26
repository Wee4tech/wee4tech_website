import React, { useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
import { ReactComponent as LogoIcon } from "../../assets/icons/mob logo final (1).svg";
import { ReactComponent as BannerIcon } from "../../assets/icons/loginBanner.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/icons/chevron-left.svg";
import "./logIn.css";
import OtpInput from "react-otp-input";
import { Button, Form, Input } from "antd";
import {
  useAdminLoginMutation,
  useGetOtpMutation,
  useVerifyOtpMutation,
} from "../../apis/login";
import {
  showErrorToast,
  showSuccessToast,
} from "../../NotificationToast/NotificationToast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  getAuthToken,
  getLoginUserDetail,
} from "../../redux/slices/loginAuth/action";

const LogIn = () => {
  const dispatch = useDispatch();
  const { Text } = Typography;
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [renderOtp, setRenderOtp] = useState(false);
  const [forgetPassword, setFogetPassword] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [adminLoginApi, { isLoading }] = useAdminLoginMutation();
  const [verifyOtpApi] = useVerifyOtpMutation();
  const [getOtpApi] = useGetOtpMutation();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const navigate = useNavigate();
  // const handleForgetPassword = () => {
  //   setFogetPassword(true);
  // };
  const handleForgetBack = () => {
    setFogetPassword(false);
  };
  const handleLoginPage = () => {
    setIsEmailValid(true);
    setOtpModal(!otpModal);
  };
  const handleOtp = async () => {
    if (otpModal) {
      setTimer(60);
      const response = await getOtpApi({ email_or_phone: emailOrPhone });
      if (response?.data?.status) {
        setRenderOtp(!renderOtp);
        showSuccessToast(response.data.message);
      } else if (!response.error.data.status) {
        showErrorToast(response.error.data.message);
        setIsEmailValid(false);
      }
    }
  };

  const handleBack = () => {
    setEmailOrPhone("");
    setRenderOtp(!renderOtp);
  };

  const resendOtp = () => {
    setOtp("");
    setTimer(60);
    // getOtpApi({ email_or_phone: emailOrPhone });
  };
  const isAuthenticated = localStorage.getItem("accessToken") !== null;

  const onFinish = async (values) => {
    try {
      if (!otpModal) {
        const response = await adminLoginApi({
          email: values.username,
          password: values.password,
        });

        if (response?.data?.status) {
          const accessToken = response?.data?.data?.access;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userName", response?.data?.data?.full_name);
          setIsEmailValid(true);
          dispatch(getAuthToken(accessToken));

          dispatch(getLoginUserDetail(response?.data?.data));
          navigate("/admin/dashboard");
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
 
  const otpVerify = async () => {
    const response = await verifyOtpApi({
      email_or_phone: emailOrPhone,
      otp: otp,
    });

    if (response?.data?.status) {
      showSuccessToast(response.data.message);
      navigate("/admin/dashboard");
    } else if (!response.error.data.status) {
      showErrorToast(response.error.data.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);
  return (
    <Row style={{ width: "100%" }}>
      <Col
        style={{
          width: "50%",
          height: "100vh",
          backgroundImage: "linear-gradient(143deg, #0354a3 25%, #74d8ad 86%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <LogoIcon style={{ height: "40px", paddingTop: "1rem" }} />

        <BannerIcon style={{ width: "80%", height: " auto" }} />
      </Col>
      <Col
        style={{
          width: "50%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col
          style={{
            padding: "20px 26px",
            maxWidth: "420px",
            width: "100%",
            height: "470px",
            boxShadow: "0 13px 36px 0 rgba(0, 0, 0, 0.16)",
            borderRadius: "16px",
          }}
        >
          {!forgetPassword ? (
            <>
              {!renderOtp ? (
                <>
                  <Col style={{ paddingBottom: "20px", textAlign: "center" }}>
                    <Text style={{ fontSize: "20px", fontWeight: 500 }}>
                      Log in to admin portal
                    </Text>
                  </Col>
                  <Form
                    name="basic"
                    style={{
                      maxWidth: 500,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item label="Email id or phone number">
                      <Form.Item
                        label="Email id or phone number"
                        name="username"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input your Email id or phone number!",
                          },
                        ]}
                      >
                        <Input
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
                    {!otpModal && (
                      <>
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
                      </>
                    )}

                    <Form.Item>
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor:
                            otpModal && !emailOrPhone ? "#dedede" : "#0354a3",
                          height: "40px",
                          fontWeight: 500,
                        }}
                        disabled={otpModal && !emailOrPhone}
                        type={"primary"}
                        htmlType="submit"
                        onClick={handleOtp}
                        loading={isLoading}
                      >
                        {otpModal ? "SEND OTP" : "LOGIN"}
                      </Button>
                    </Form.Item>
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <Text>OR</Text>
                    </Col>
                    <Form.Item>
                      <Button
                        style={{
                          width: "100%",
                          fontWeight: 500,
                          height: "40px",
                        }}
                        onClick={handleLoginPage}
                      >
                        {otpModal ? "Enter password" : "Request OTP"}
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              ) : (
                <>
                  <Row style={{ justifyContent: "center", gap: "1rem" }}>
                    <Col
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Col style={{ width: "35%" }}>
                        <LeftArrowIcon
                          style={{ cursor: "pointer" }}
                          onClick={handleBack}
                        />{" "}
                      </Col>
                      <Text
                        style={{
                          fontSize: "20px",
                          fontWeight: 500,
                          width: "65%",
                        }}
                      >
                        Enter OTP
                      </Text>
                    </Col>
                    <Col style={{ paddingBottom: "1rem" }}>
                      <Text>
                        Enter OTP sent to 9866546328{" "}
                        <Text style={{ color: "#2973f0", fontWeight: 500 }}>
                          CHANGE
                        </Text>
                      </Text>
                    </Col>
                    <Col>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => (
                          <Input
                            {...props}
                            style={{
                              width: "50px",
                              height: "50px",
                              marginRight: "10px",
                              textAlign: "center",
                            }}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  <Col style={{ marginTop: "1rem" }}>
                    {timer > 0 ? (
                      <>
                        <Text>Resend OTP in {timer} seconds</Text>
                        <Button
                          style={{
                            width: "100%",
                            fontWeight: 500,
                            height: "40px",
                            backgroundColor: "#0354a3",
                            marginTop: "1rem",
                          }}
                          disabled={!otp}
                          type="primary"
                          onClick={otpVerify}
                        >
                          VERIFY
                        </Button>
                      </>
                    ) : (
                      <Button
                        style={{
                          width: "100%",
                          fontWeight: 500,
                          height: "40px",
                          marginTop: "1rem",
                        }}
                        onClick={resendOtp}
                      >
                        RESEND OTP
                      </Button>
                    )}
                  </Col>
                </>
              )}{" "}
            </>
          ) : (
            <>
              <Row style={{ gap: "1.5rem" }}>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Col style={{ width: "27%" }}>
                    <LeftArrowIcon
                      style={{ cursor: "pointer" }}
                      onClick={handleForgetBack}
                    />{" "}
                  </Col>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      width: "73%",
                    }}
                  >
                    Forgot password
                  </Text>
                </Col>
                <Col>
                  <Text style={{ fontSize: "13.7px" }}>
                    Please specify your email address to receive instructions
                    for resetting it. If an account exists by that email, we
                    will send a password reset
                  </Text>
                </Col>
              </Row>
              <Form
                name="basic"
                style={{
                  maxWidth: 500,
                  marginTop: "1rem",
                }}
                initialValues={{
                  remember: true,
                }}
                layout="vertical"
                autoComplete="off"
              >
                <Form.Item label="Email id">
                  <Form.Item
                    label="Email id"
                    name="username"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email id!",
                      },
                    ]}
                  >
                    <Input
                      className="custom-input"
                      style={{ height: "40px" }}
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    style={{
                      width: "100%",
                      fontWeight: 500,
                      height: "40px",
                      backgroundColor: "#0354a3",
                    }}
                    htmlType="submit"
                  >
                    SEND RESET LINK
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </Col>
      </Col>
    </Row>
  );
};

export default LogIn;
