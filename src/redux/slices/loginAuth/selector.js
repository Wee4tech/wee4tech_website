export const loginAuthSelector = (state) => state.loginAuth.authToken;
export const loginUserDetailSelector = (state) =>
  state.loginAuthReducer.loginUserDetail;
export const main_search_listSelector = (state) =>
  state.loginAuthReducer.main_search_list;
export const seller_ListSelector = (state) =>
  state.loginAuthReducer.seller_List;
