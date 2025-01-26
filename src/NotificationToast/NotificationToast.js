import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationToast = () => {
  return (
    <>
      <ToastContainer />
    </>
  );
};

export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  // toast.dismiss();
  toast.error(message);
};
export const showInfoToast = (message) => {
  toast.info(message);
};

export default NotificationToast;
