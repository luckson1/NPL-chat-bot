import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseURL } from '../../../utils/BaseUrl'

// Define a service using a base URL and expected endpoints
export const ApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BaseURL}),
  tagTypes: ["User", "Message"],
  endpoints: (builder) => ({}),
})