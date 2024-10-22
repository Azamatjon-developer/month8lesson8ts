import { api } from './index'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    login: build.mutation({
      query: (body) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getAllUsers: build.query({
      query: () => ({
        url: '/api/user/all?limit=1000',
        method: 'GET',
      }),
      providesTags: [{ type: 'User' }],
    }),
    getUser: build.query({
      query: (username) => ({
        url: `/api/user/profile/${username}`,
      }),
    }),
    follow: build.mutation({
      query: (username) => ({
        url: `/api/user/follow/${username}`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    unfollow: build.mutation({
      query: (username) => ({
        url: `/api/user/unfollow/${username}`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    getUserByUsername: build.query({
      query: (username) => ({
        url: `/api/user/profile/${username}`,
      }),
      providesTags: [{ type: 'User' }],
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: '/api/post',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    uploadFiles: build.mutation({
      query: (body) => ({
        url: '/api/upload/files',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    getFeed: build.query({
      query: () => ({
        url: '/api/user/feed?limit=3000'
      })
    }),
    getUserName: build.query({
      query: (username) => ({
        url: `/api/user/profile/${username}`,
      }),
      providesTags: [{ type: 'User' }],
  
  }),
  getAllPosts: build.query({
    query: (username) => ({
      url: `/api/post/${username}`,
    }),
    providesTags: [{ type: 'User' }],
  }),

})
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetUserByUsernameQuery,
  useCreatePostMutation,
  useUploadFilesMutation,
  useGetFeedQuery,
  useGetUserNameQuery,
  useGetAllPostsQuery
  
} = userApi
