import { api } from './index'

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body)=> ({
        url:"/register",
        method: "POST",
        body
      }),
      invalidatesTags: ["register"]
    }),
    
  }),
})

export const {
  useCreateUserMutation,
} = productApi

