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
      getAllUsers: build.query({
        query: ()=> ({
          url:"/api/user/all?limit=20",
          method: "GET"
        }),
        providesTags: ["User"]
      })
      
}),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllUsersQuery,
} = userApi

