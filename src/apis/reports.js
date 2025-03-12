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

    getDataTracksReports: builder.query({
      query: (body) => {
        return {
          url: `https://api.company-information.service.gov.uk/advanced-search/companies?company_name_includes=sample&company_status=active&start_index=0`,
          method: "GET",          
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic NjcyZGM0ZGQtZjRjNi00YzFhLTkwMjktZGVmN2NiNTQ3M2RhOg==',
            'Cookie': 'JSESSIONID=296FB41F5F91B647B95328119FB7F58B',
          },
        };
      },
    }),
   
  }),
});

export const {
  useLazyGetContactUsReportQuery,
  useLazyGetCarriersReportsQuery,
  useLazyGetDataTracksReportsQuery
  
} = reportsAPI;

export default reportsAPI;
