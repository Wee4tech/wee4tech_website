import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SellerauthToken: "",
  SellerloginUserDetail: {},
 main_search_list: [],
};

export const SellerloginAuth = createSlice({
  name: "loginAuth",
  initialState,
  reducers: {
    getSellerAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    getSellerLoginUserDetail: (state, { payload }) => {
      state.loginUserDetail = payload;
    },
    getMain_search_list: (state, { payload }) => {
      state.main_search_list = payload;
    },
  },
});

export const { getSellerAuthToken, getSellerLoginUserDetail,getMain_search_list } =
SellerloginAuth.actions;

export default SellerloginAuth.reducer;
