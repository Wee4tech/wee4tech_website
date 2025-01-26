export const sellerCatalogueTableSelector = (state) =>
  state.sellerCatalogueReducer.sellerTableData;
export const inventoryPriceTableSelector = (state) =>
  state.sellerCatalogueReducer.inventoryPriceTableData;
export const sellerMobLibraryTableSelector = (state) =>
  state.sellerCatalogueReducer.sellerMobLibraryTableData;
export const sellerCatalogueTableProductSelector = (state) =>
  state.sellerCatalogueReducer.productData;
export const sellerDataSelector = (state) =>
  state.sellerCatalogueReducer.sellerData;
export const sellerVenderDetailsSelector = (state) =>
  state.sellerCatalogueReducer.sellerVenderDetail;
export const editSellerVenderDetailsSelector = (state) =>
  state.sellerCatalogueReducer.editVenderDetail;
export const allAddressSellerSelector = (state) =>
  state.sellerCatalogueReducer.allAddress;
export const editAddressSellerSelector = (state) =>
  state.sellerCatalogueReducer.editAddress;
export const sellerViewStatusSelector = (state) =>
  state.sellerCatalogueReducer.viewStatus;
export const addCatalogueLengthSelector = (state) =>
  state.sellerCatalogueReducer.addCatalogueLength;
