import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sellerTableData: {},
  inventoryPriceTableData: {},
  sellerMobLibraryTableData: {},
  productData: {},
  sellerData: [],
  sellerVenderDetail: {},
  editVenderDetail: {},
  allAddress: [],
  editAddress: {},
  viewStatus: {},
  addCatalogueLength: 0,
};

export const sellerCatalogue = createSlice({
  name: "sellerCatalogue",
  initialState,
  reducers: {
    getSellerTableData: (state, { payload }) => {
      state.sellerTableData = payload;
    },
    getInventoryPriceTableData: (state, { payload }) => {
      state.inventoryPriceTableData = payload;
    },
    getSellerMobLibraryTableData: (state, { payload }) => {
      state.sellerMobLibraryTableData = payload;
    },
    getSellerTableRowData: (state, { payload }) => {
     
      state.productData = payload;
    },
    getSellerData: (state, { payload }) => {
      state.sellerData = payload;
    },
    getSellerVenderDetail: (state, { payload }) => {
      state.sellerVenderDetail = payload;
    },
    getEditSellerVenderDetail: (state, { payload }) => {
      state.editVenderDetail = payload;
    },
    getAllSellerAddress: (state, { payload }) => {
      state.allAddress = payload;
    },
    getEditSellerAddress: (state, { payload }) => {
      state.editAddress = payload;
    },
    getViewStatus: (state, { payload }) => {
      state.viewStatus = payload;
    },
    getAddCatalogueLength: (state, { payload }) => {
      state.addCatalogueLength = payload;
    },
  },
});

export const {
  getSellerTableData,
  getSellerTableRowData,
  getSellerData,
  getSellerVenderDetail,
  getEditSellerVenderDetail,
  getAllSellerAddress,
  getEditSellerAddress,
  getViewStatus,
  getInventoryPriceTableData,
  getSellerMobLibraryTableData,
  getAddCatalogueLength,
} = sellerCatalogue.actions;

export default sellerCatalogue.reducer;
