import { api } from './index'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
      register: build.mutation({
        query: (body)=> ({
          url:"/api/auth/register",
          method: "POST",
          body
        }),
        invalidatesTags: ["User"]
      }),
      login: build.mutation({
        query: (body)=> ({
          url:"/api/auth/login",
          method: "POST",
          body
        }),
        invalidatesTags: ["User"]
      }),
}),
})

export const {
  useRegisterMutation,
  useLoginMutation,
} = userApi

