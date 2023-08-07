import { baseApi } from "../baseApi";

export const authAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: ({ headers, body }) => ({
        headers,
        url: "/auth/admin/login",
        method: "POST",
        body,
      })
    }),
  }),
  overrideExisting: true
});

export const { useAdminLoginMutation } = authAdminApi;