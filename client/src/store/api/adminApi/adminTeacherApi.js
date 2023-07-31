import { baseApi } from '../baseApi';

export const adminTeacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeachersAll: builder.query({
      query: () => "/admin/teacher",
    }),
    getTeacherSingle: builder.query({
      query: (teacherId) => `/admin/teacher/${teacherId}`,
    }),
    addTeacher: builder.mutation({
      query: (body) => ({
        url: "/admin/teacher",
        method: "POST",
        body,
      })
    }),
    deleteTeacher: builder.mutation({
      query: (teacherId) => ({
        url: `/admin/teacher/${teacherId}`,
        method: "DELETE",
      })
    }),
    updateTeacher: builder.mutation({
      query: ({ teacherId, body }) => ({
        url: `/admin/teacher/${teacherId}`,
        method: "PUT",
        body,
      })
    }),
  }),
  overrideExisting: true,
});

export const { useGetTeachersAllQuery, useLazyGetTeacherSingleQuery, useAddTeacherMutation, useDeleteTeacherMutation, useUpdateTeacherMutation } = adminTeacherApi;