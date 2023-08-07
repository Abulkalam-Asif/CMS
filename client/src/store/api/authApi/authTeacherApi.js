import { baseApi } from "../baseApi";

export const authTeacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    teacherLogin: builder.mutation({
      query: ({ headers, body }) => ({
        headers,
        url: "/auth/teacher/login",
        method: "POST",
        body,
      })
    }),
  }),
  overrideExisting: true
});

export const { useTeacherLoginMutation } = authTeacherApi;