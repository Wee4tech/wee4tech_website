import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "./baseQuery";

export const reportsAPI = createApi({
  reducerPath: "reportsAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getContactUsReport: builder.query({
      query: (body) => {
        console.log("🚀 ~ params:", body)
        return {
          url: `Registration/GetContactus`,
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
        },
        };
      },
    }),

    getCarriersReports: builder.query({
      query: (body) => {
        return {
          url: `Careers/GetCareersApplied/`,
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
        },
        };
      },
    }),
   
  }),
});

export const {
  useLazyGetContactUsReportQuery,
  useLazyGetCarriersReportsQuery
  
} = reportsAPI;

export default reportsAPI;
