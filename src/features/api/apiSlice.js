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
        getRelatedVideos: builder.query({
            query: ({ videoId, videoTitle }) => {
                const tags = videoTitle.split(' ');
                const query = tags.map(tag => `title_like=${tag}`).join('&');
                const url = `/videos?${query}&id_ne=${videoId}&_limit=4`
                console.log(url);
                return url;
            },
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
    useGetRelatedVideosQuery,
    useCreateVideoMutation,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
} = apiSlice