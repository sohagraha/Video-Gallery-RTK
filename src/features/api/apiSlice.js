import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    tagTypes: ['Videos', 'Video', 'RelatedVideo'],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            keepUnusedDataFor: 600,
            providesTags: ['Videos'],
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg) => [
                { type: 'Video', id: arg },
            ],
        }),
        getRelatedVideos: builder.query({
            query: ({ videoId, videoTitle }) => {
                const tags = videoTitle.split(' ');
                const query = tags.map(tag => `title_like=${tag}`).join('&');
                const url = `/videos?${query}&id_ne=${videoId}&_limit=4`
                console.log(url);
                return url;
            },
            providesTags: (result, error, arg) => [
                { type: 'RelatedVideo', id: arg.id },
            ],
        }),
        createVideo: builder.mutation({
            query: (body) => ({
                url: '/videos',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Videos',],
        }),

        updateVideo: builder.mutation({
            query: (body) => ({
                url: `/videos/${body.id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                'Videos',
                {
                    type: 'Video',
                    id: arg.id,
                },
                {
                    type: 'RelatedVideo',
                    id: arg.id,
                }
            ],
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Videos',],
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