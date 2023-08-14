import { baseApi } from "../baseApi";

export const authAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: ({ sendSessionCookie, body }) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: sendSessionCookie ? undefined : body,
      })
    }),
  }),
  overrideExisting: true
});

export const { useAdminLoginMutation } = authAdminApi;