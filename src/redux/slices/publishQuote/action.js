import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quoteId: "",
  quoteItems: "",
  quoteTotalPrice: "",
  quoteTime: "",
  quote_status: "",
  index: "",
};

export const publishQuote = createSlice({
  name: "publishQuote",
  initialState,
  reducers: {
    getPublishQuote: (state, { payload }) => {
      state.quoteId = payload?.quoteId;
      state.quoteItems = payload?.quoteItems;
      state.quoteTime = payload?.quoteTime;
      state.quoteTotalPrice = payload?.quoteTotalPrice;
      state.quote_status = payload?.quote_status;
      state.index = payload?.index;
    },
  },
});

export const { getPublishQuote } = publishQuote.actions;

export default publishQuote.reducer;
