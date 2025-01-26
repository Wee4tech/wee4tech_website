export const rfqListSelector = (state) => state.rfqList.data;
export const rfqListDataSelctor = (state) => state.rfqList.listData;
export const acceptedConvertedOrderSelctor = (state) =>
  state.rfqList.acceptedAndConvertedOrder;
export const publishedUnpublishedSelctor = (state) =>
  state.rfqList.publishedUnpublished;
export const rfqListFlagSelector = (state) => state.rfqList.rfqListFlag;
