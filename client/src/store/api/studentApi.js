import { baseApi } from "./baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    studentLogin: builder.mutation({
      query: ({ headers, body }) => ({
        headers,
        url: "/student/login",
        method: "POST",
        body,
      })
    }),
  }),
  overrideExisting: true
});

export const { useStudentLoginMutation } = studentApi;