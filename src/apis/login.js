import { createApi } from "@reduxjs/toolkit/query/react";
import { loginBaseQuery } from "./baseQuery";
export const authenticationAPI = createApi({
  reducerPath: "authenticationAPI",
  baseQuery: loginBaseQuery,
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (formData) => ({
        url: "/api/accounts/admin-login/",
        method: "POST",
        body: formData,
      }),
    }),

    getOtp: builder.mutation({
      query: (formOtp) => ({
        url: "/accounts/mob_admin/login_with_otp/",
        method: "POST",
        body: formOtp,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (formOtpVerify) => ({
        url: "/accounts/mob_admin/check_otp/",
        method: "POST",
        body: formOtpVerify,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetOtpMutation,
  useVerifyOtpMutation,
} = authenticationAPI;

export default authenticationAPI;
