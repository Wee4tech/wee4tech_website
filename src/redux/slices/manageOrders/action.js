import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersTableData: {},
  editOrderDetail: {},
  editSubOrderDetail: {},
  vehicleDetail: {},
  subOrderViewImagesData: [],
};

export const manageOrders = createSlice({
  name: "manageOrders",
  initialState,
  reducers: {
    getmanageOrdersTableData: (state, { payload }) => {
      state.ordersTableData = payload;
    },
    getEditOrderDetail: (state, { payload }) => {
      state.editOrderDetail = payload;
    },
    getEditSubOrderDetail: (state, { payload }) => {
      state.editSubOrderDetail = payload;
    },
    getVehiclerDetail: (state, { payload }) => {
      state.vehicleDetail = payload;
    },
    getSubOrderViewImagesData: (state, { payload }) => {
      state.subOrderViewImagesData = payload;
    },
  },
});

export const {
  getmanageOrdersTableData,
  getEditOrderDetail,
  getEditSubOrderDetail,
  getVehiclerDetail,
  getSubOrderViewImagesData,
} = manageOrders.actions;

export default manageOrders.reducer;
