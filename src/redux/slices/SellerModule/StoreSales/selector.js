export const StoreSalesUserSelector = (state) => {
    return (
      state.StoreSales?.quoteData?.payload?.data || state.StoreSales.quoteData
    );
  };
  export const editQuoteDataSelector = (state) =>
    state.StoreSales.editQuoteData.data || state.StoreSales.editQuoteData;
  export const vendorListSelector = (state) => state.StoreSales.vendorList;
  export const catalogueSelector = (state) => state.StoreSales.vendorCatalogue;
  export const bmpPriceSelector = (state) => state.StoreSales.bmpPrice;
  export const grandPriceSelector = (state) => state.StoreSales.grandPrice;
  export const deliveryAddressSelector = (state) =>
    state.StoreSales.delivery_address;
  export const billingAddressSelector = (state) =>
    state.StoreSales.billing_address;
  export const deliveryAddressListSelector = (state) =>
    state.StoreSales.delivery_address_list;
  export const billingAddressListSelector = (state) =>
    state.StoreSales.billing_address_list;
  export const addressFlagSelector = (state) => state.StoreSales.addressFlag;
  export const deleteAddressSelector = (state) =>
    state.StoreSales.deleteAddressContainer;
  