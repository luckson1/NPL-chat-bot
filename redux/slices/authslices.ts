
import { ApiSlice } from "../Api/Api"

export interface UserCredentials {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
  }


export const authApiSlice= ApiSlice.injectEndpoints({
    endpoints: builder=> ({
        registerUser :  builder.mutation({
            query: (body: UserCredentials) => ({
              url: "users/signup",
              method: "POST",
              body,
            }),
            
          }),
    })
})

export const {
    useRegisterUserMutation
}=authApiSlice