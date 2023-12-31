import { baseApi } from "../baseApi";

export const authStudentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    studentLogin: builder.mutation({
      query: ({ headers, body }) => ({
        headers,
        url: "/auth/student/login",
        method: "POST",
        body,
      })
    }),
  }),
  overrideExisting: true
});

export const { useStudentLoginMutation } = authStudentApi;