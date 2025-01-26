import { createSelector } from '@reduxjs/toolkit';

export const selectPayment = (state) => state.payment;



export const selectAmountExcessLimit = createSelector(
  selectPayment,
  (payment) => payment.amountExcessLimit
);

export const selectRazorpayPaymentId = createSelector(
  selectPayment,
  (payment) => payment.razorpay_payment_id
);

export const selectRazorpayOrderId = createSelector(
  selectPayment,
  (payment) => payment.razorpay_order_id
);

export const selectRazorpaySignature = createSelector(
  selectPayment,
  (payment) => payment.razorpay_signature
);