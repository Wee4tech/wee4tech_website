export const usersListSelector = (state) => state.createOrder.usersList;
export const usersDataSelector = (state) => state.createOrder.userData;
export const createOrderDeliveryAddressSelector = (state) =>
  state.createOrder.delivery_address;
export const createOrderBillingAddressSelector = (state) =>
  state.createOrder.billing_address;
export const createOrderProductListSelector = (state) =>
  state.createOrder.productList;
export const createOrderDrawerProductDataSelector = (state) =>
  state.createOrder.drawerProductData;
export const createOrderModalProductDataSelector = (state) =>
  state.createOrder.modalProductData;
