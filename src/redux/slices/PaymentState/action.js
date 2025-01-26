import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  rupifyOrderPaymentURL: "",
  amountExcessLimit: false,
  razorpay_payment_id: "",
  razorpay_order_id: "",
  razorpay_signature: "",
};

export const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    updateRupifyOrderPaymentURL: (state, {payload}) => {
      state.rupifyOrderPaymentURL = payload;
    },
    updateAmountExcessLimit: (state, {payload}) => {
      state.amountExcessLimit = payload;
    },
    update_razorpay_payment_id: (state, {payload}) => {
      state.razorpay_payment_id = payload;
    },
    update_razorpay_order_id: (state, {payload}) => {
      state.razorpay_order_id = payload;
    },
    update_razorpay_signature: (state, {payload}) => {
      state.razorpay_signature = payload;
    },
  },
});

export const {
  updateRupifyOrderPaymentURL,
  updateAmountExcessLimit,
  update_razorpay_payment_id,
  update_razorpay_order_id,
  update_razorpay_signature,
} = paymentSlice.actions;

export default paymentSlice.reducer;
