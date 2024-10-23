import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { logout } from '../slice/auth-slice';
import { useNavigate } from 'react-router-dom';

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const { dispatch } = api;
  const navigate = useNavigate()
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("x-auth-token")
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;
    if (status === 401 || status === 403) {
      console.error('Unauthorized access - Redirecting to login...');
      dispatch(logout())
      navigate("/login")
    }
  }
  return result;
};
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 })

export const api = createApi({
  reducerPath: 'myApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ["User"], 
  endpoints: () => ({}),
})