export const createQuoteUserSelector = (state) => {
  return (
    state.createQuote?.quoteData?.payload?.data || state.createQuote.quoteData
  );
};
export const editQuoteDataSelector = (state) =>
  state.createQuote.editQuoteData.data || state.createQuote.editQuoteData;
export const vendorListSelector = (state) => state.createQuote.vendorList;
export const catalogueSelector = (state) => state.createQuote.vendorCatalogue;
export const bmpPriceSelector = (state) => state.createQuote.bmpPrice;
export const grandPriceSelector = (state) => state.createQuote.grandPrice;
export const DeliveryFeeSelector = (state) => state.createQuote.DeliveryFee;
export const deliveryAddressSelector = (state) =>
  state.createQuote.delivery_address;
export const billingAddressSelector = (state) =>
  state.createQuote.billing_address;
export const deliveryAddressListSelector = (state) =>
  state.createQuote.delivery_address_list;
export const billingAddressListSelector = (state) =>
  state.createQuote.billing_address_list;
export const addressFlagSelector = (state) => state.createQuote.addressFlag;
export const deleteAddressSelector = (state) =>
  state.createQuote.deleteAddressContainer;
