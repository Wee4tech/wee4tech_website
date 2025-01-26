import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const formsAPI = createApi({
  reducerPath: "formsAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getLineofCredit: builder.query({
      query: (params) => {
        return {
          url: `api/request_line_of_credit/`,
          params,
        };
      },
    }),
    getBecomeSeller: builder.query({
      query: (params) => {
        return {
          url: `api/become_supplier/`,
          params,
        };
      },
    }),
    getLineofCreditExcel: builder.query({
      query: (params) => {
        return {
          url: `/api/download_request_line_of_credit/`,
          params,
        };
      },
    }),
  }),
});

export const {
  useLazyGetLineofCreditQuery,
  useLazyGetBecomeSellerQuery,
  useLazyGetLineofCreditExcelQuery,
} = formsAPI;

export default formsAPI;
