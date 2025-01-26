export const SellerloginAuthSelector = (state) => state.SellerloginAuth.authToken;
export const SellerloginUserDetailSelector = (state) =>
  state.SellerloginAuthReducer.loginUserDetail;
export const main_search_listSelector = (state) =>
  state.loginAuthReducer.main_search_list;
