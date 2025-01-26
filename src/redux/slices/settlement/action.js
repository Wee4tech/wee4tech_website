import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settlementTableList: {},
  settlementDataByID: {},
  settlementSearchData: [],
};

export const settlement = createSlice({
  name: "settlement",
  initialState,
  reducers: {
    getSettlementTableList: (state, { payload }) => {
      state.settlementTableList = payload;
    },
    getSettlementDataByID: (state, { payload }) => {
      state.settlementDataByID = payload;
    },
    getSettlementSearchData: (state, { payload }) => {
      state.settlementSearchData = payload;
    },
  },
});

export const {
  getSettlementTableList,
  getSettlementDataByID,
  getSettlementSearchData,
} = settlement.actions;

export default settlement.reducer;
