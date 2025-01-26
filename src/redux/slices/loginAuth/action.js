import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: "",
  loginUserDetail: {},
  main_search_list: [],
  seller_List:[]
};

export const loginAuth = createSlice({
  name: "loginAuth",
  initialState,
  reducers: {
    getAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    getLoginUserDetail: (state, { payload }) => {
      state.loginUserDetail = payload;
    },
    getMain_search_list: (state, { payload }) => {
      state.main_search_list = payload;
    },
    getSeller_list: (state, { payload }) => {
      state.seller_List = payload;
    },
  },
});

export const { getAuthToken, getLoginUserDetail, getMain_search_list,getSeller_list } =
  loginAuth.actions;
export default loginAuth.reducer;
