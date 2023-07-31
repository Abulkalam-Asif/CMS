import { baseApi } from '../baseApi';

export const adminStudentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentsAll: builder.query({
      query: () => "/admin/student",
    }),
    getStudentSingle: builder.query({
      query: (rollNo) => `/admin/student/${rollNo}`,
    }),
    addStudent: builder.mutation({
      query: (body) => ({
        url: "/admin/student",
        method: "POST",
        body,
      })
    }),
    deleteStudent: builder.mutation({
      query: (rollNo) => ({
        url: `/admin/student/${rollNo}`,
        method: "DELETE",
      })
    }),
    updateStudent: builder.mutation({
      query: ({ rollNo, body }) => ({
        url: `/admin/student/${rollNo}`,
        method: "PUT",
        body,
      })
    }),
  }),
  overrideExisting: true,
});

export const { useGetStudentsAllQuery, useLazyGetStudentSingleQuery, useAddStudentMutation, useDeleteStudentMutation, useUpdateStudentMutation } = adminStudentApi;