import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  usersList: [],
  userData: {},
  delivery_address: {},
  billing_address: {},
  productList: [],
  drawerProductData: {},
  modalProductData: {},
};

export const createOrder = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    getCreateOrderUserList: (state, {payload}) => {
      state.usersList = payload;
    },
    getCreateOrderUserData: (state, {payload}) => {
      state.userData = payload;
    },
    getCreateOrderDeliveryAddress: (state, {payload}) => {
      state.delivery_address = payload;
    },
    getCreateOrderBillingAddress: (state, {payload}) => {
      state.billing_address = payload;
    },
    getCreateOrderProductList: (state, {payload}) => {
      state.productList = payload;
    },
    getCreateOrderDrawerProductData: (state, {payload}) => {
      state.drawerProductData = payload;
    },
    getCreateOrderModalProductData: (state, {payload}) => {
      state.modalProductData = payload;
    },
  },
});

export const {
  getCreateOrderUserList,
  getCreateOrderUserData,
  getCreateOrderDeliveryAddress,
  getCreateOrderBillingAddress,
  getCreateOrderProductList,
  getCreateOrderDrawerProductData,
  getCreateOrderModalProductData,
} = createOrder.actions;

export default createOrder.reducer;
