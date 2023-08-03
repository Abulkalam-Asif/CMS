import { baseApi } from '../baseApi';

export const adminCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAll: builder.query({
      query: () => "/admin/course",
    }),
    getCourseSingle: builder.query({
      query: (courseId) => `/admin/course/${courseId}`,
    }),
    addCourse: builder.mutation({
      query: (body) => ({
        url: "/admin/course",
        method: "POST",
        body,
      })
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/admin/course/${courseId}`,
        method: "DELETE",
      })
    }),
    updateCourse: builder.mutation({
      query: ({ courseId, body }) => ({
        url: `/admin/course/${courseId}`,
        method: "PUT",
        body,
      })
    }),
  }),
  overrideExisting: true,
});

export const { useGetCoursesAllQuery, useLazyGetCourseSingleQuery, useAddCourseMutation, useDeleteCourseMutation, useUpdateCourseMutation } = adminCourseApi;