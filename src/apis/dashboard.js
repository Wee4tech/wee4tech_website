import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const dashboardAPI = createApi({
  reducerPath: "dashboardAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: (params) => {
        return {
          url: `api/accounts/dashboard/`,
          params,
        };
      },
    }),

    getMainSearch: builder.query({
      query: (params) => {
        return {
          url: `api/accounts/dashboard/dashboard_search/`,
          params,
        };
      },
    }),
  }),
});

export const { useLazyGetDashboardQuery, useLazyGetMainSearchQuery } =
  dashboardAPI;

export default dashboardAPI;
