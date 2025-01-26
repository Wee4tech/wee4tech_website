import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../commonUtils/commonUtils.js";

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl + "/",
 
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    localStorage.clear();
  }
  return result;
};
const loginBaseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl + "/",
  // timeout: 15000,
});

export { baseQuery, loginBaseQuery, baseQueryWithReauth };
