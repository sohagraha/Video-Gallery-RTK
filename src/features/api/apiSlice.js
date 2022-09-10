import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
        }),
        createVideo: builder.mutation({
            query: (body) => ({
                url: '/videos',
                method: 'POST',
                body,
            }),
        }),
        updateVideo: builder.mutation({
            query: (body) => ({
                url: `/videos/${body.id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',
            }),
        }),
    })
})

export const {
    useGetVideosQuery,
    useGetVideoQuery,
    useCreateVideoMutation,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
} = apiSlice