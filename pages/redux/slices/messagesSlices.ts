import { ApiSlice } from "../Api/Api"

export interface messageFormValues {
    messageBody: string
 }

export const messagesSlice= ApiSlice.injectEndpoints({
    endpoints: builder=> ({
       
          getMessages: builder.query({
            query: ()=> "/messages",
            providesTags: ["Message"]
          }),
          createMessage :  builder.mutation({
            query: (body: messageFormValues) => ({
              url: "/messages",
              method: "POST",
              body,
             
            }),
            invalidatesTags: ['Message'],
            
          }),
    })
})

export const {
    useCreateMessageMutation, useGetMessagesQuery
}=messagesSlice