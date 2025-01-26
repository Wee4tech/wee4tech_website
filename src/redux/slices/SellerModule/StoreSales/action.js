import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quoteData: {},
  editQuoteData: {},
  vendorList: [],
  vendorCatalogue: [],
  bmpPrice: [{}],
  grandPrice: {},
  delivery_address: {},
  billing_address: {},
  delivery_address_list: [],
  billing_address_list: [],
  addressFlag: false,
  deleteAddressContainer: {},
};

export const StoreSales = createSlice({
  name: "StoreSales",
  initialState,
  reducers: {
    getRFQUserById: (state, action) => {
      state.quoteData = action;
    },
    getRFQQuoteData: (state, { payload }) => {
      state.editQuoteData = payload;
    },
    getAllVendors: (state, { payload }) => {
      state.vendorList = payload;
    },
    getCatalogueByVendor: (state, { payload }) => {
      state.vendorCatalogue = payload;
    },
    handleReset: (state) => {
      state.vendorList = [];
    },
    getBmpPrice: (state, { payload }) => {
      if (state.bmpPrice[payload?.index]) {
        state.bmpPrice = state.bmpPrice.map((item, index) =>
          index === payload.index ? payload : item
        );
      } else if (payload?.length >= 0) {
        state.bmpPrice = payload;
      } else {
        state.bmpPrice.push(payload);
      }
    },
    getDeliveryAddress: (state, { payload }) => {
      state.delivery_address = payload;
    },
    getGrandPrice: (state, { payload }) => {
      state.grandPrice = payload;
    },
    getBillingAddress: (state, { payload }) => {
      state.billing_address = payload;
    },
    getDeliveryAddressList: (state, { payload }) => {
      state.delivery_address_list = payload;
    },
    getBillingAddressList: (state, { payload }) => {
      state.billing_address_list = payload;
    },
    updateAddressFlag: (state, { payload }) => {
      state.addressFlag = payload;
    },
    getDeleteAddressContainer: (state, { payload }) => {
      state.deleteAddressContainer = payload;
    },
  },
});

export const {
  getRFQUserById,
  getRFQQuoteData,
  getAllVendors,
  getCatalogueByVendor,
  handleReset,
  getBmpPrice,
  getDeliveryAddress,
  getBillingAddress,
  getDeliveryAddressList,
  getBillingAddressList,
  updateAddressFlag,
  getGrandPrice,
  getDeleteAddressContainer,
} = StoreSales.actions;

export default StoreSales.reducer;
