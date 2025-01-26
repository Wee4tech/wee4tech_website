export const manageOrdersDataSelector = (state) =>
  state.manageOrdersReducer?.ordersTableData;
export const editOrderDetailSelector = (state) =>
  state.manageOrdersReducer?.editOrderDetail;
export const editSubOrderDetailSelector = (state) =>
  state.manageOrdersReducer?.editSubOrderDetail;
export const vehicleDetailSelector = (state) =>
  state.manageOrdersReducer?.vehicleDetail;
export const subOrderViewImagesDataSelector = (state) =>
  state.manageOrdersReducer?.subOrderViewImagesData;
