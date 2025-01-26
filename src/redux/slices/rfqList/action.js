import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  listData: {},
  acceptedAndConvertedOrder: [],
  publishedUnpublished: [],
  rfqListFlag: false,
};

export const rfqList = createSlice({
  name: "rfqList",
  initialState,
  reducers: {
    getRFQList: (state, { payload }) => {
      state.data = payload;
    },
    getRFQListDetailsById: (state, { payload }) => {
      state.listData = payload;
    },
    getAcceptedConvertedOrderQuote: (state, { payload }) => {
      state.acceptedAndConvertedOrder = payload;
    },
    getPublishedUnpublishedQuote: (state, { payload }) => {
      state.publishedUnpublished = payload;
    },
    getRFQListFlag: (state, { payload }) => {
      state.rfqListFlag = payload;
    },
  },
});

export const {
  getRFQList,
  getRFQListDetailsById,
  getAcceptedConvertedOrderQuote,
  getPublishedUnpublishedQuote,
  getRFQListFlag,
} = rfqList.actions;

export default rfqList.reducer;
