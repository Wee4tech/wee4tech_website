import React, {useState} from "react";
import {Button, Col, Modal, Input, Form, Typography} from "antd";
import "./AddCommentModal.css";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../NotificationToast/NotificationToast";
const {Text} = Typography;
const initialValue = {comment: ""};
const AddCommentModal = ({
  isModalOpen,
  setIsModalOpen,
  addCommentApi,
  data,
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(initialValue);
  const handleOk = async () => {
    const param = {
      servicerequest: data?.id,
      comment: formData?.comment,
    };
    const response = await addCommentApi(param);
    if (response?.data?.status) {
      showSuccessToast(response?.data?.message);
      handleCancel();
    } else {
      showErrorToast(response?.error?.data?.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFormData(initialValue);
  };
  const handleOnChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };

  return (
    <Modal
      title="Add comment"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Col
          key="footer"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "28px",
          }}>
          <Button
            key="cancel"
            onClick={handleCancel}
            style={{
              height: "48px",
              fontWeight: 500,
              fontSize: "14px",
              width: "120px",
            }}>
            CANCEL
          </Button>
          <Button
            key="save"
            type="primary"
            htmlType="submit"
            form="commentForm"
            disabled={!formData?.comment}
            style={{
              height: "48px",
              fontWeight: 500,
              fontSize: "14px",
              backgroundColor: !formData?.comment
                ? "rgb(157, 167, 178)"
                : "#0354a3",
            }}
            onClick={handleOk}>
            SAVE AND ADD
          </Button>
        </Col>,
      ]}>
      <Form
        form={form}
        id="commentForm"
        layout="vertical"
        // onFinish={handleOk}
        style={{padding: "8px 24px"}}>
        <Form.Item
          className="comment-item"
          // name="comment"
          label={
            <Col
              className="comment-header"
              style={{
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}>
              Comment
              <Text style={{color: "red"}}>*</Text>
            </Col>
          }
          // rules={[{required: true, message: "Please enter your comment!"}]}
        >
          <Input.TextArea
            name="comment"
            rows={4}
            placeholder="Enter Comment"
            className="wallet-amount-input"
            value={formData?.comment}
            onChange={handleOnChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCommentModal;
