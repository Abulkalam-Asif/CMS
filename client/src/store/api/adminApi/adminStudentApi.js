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
      query: (id) => ({
        url: `/admin/student/${id}`,
        method: "DELETE",
      })
    })
  }),
  overrideExisting: true,
});

export const { useGetStudentsAllQuery, useLazyGetStudentSingleQuery, useAddStudentMutation, useDeleteStudentMutation } = adminStudentApi;