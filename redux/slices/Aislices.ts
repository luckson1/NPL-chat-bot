import { ApiSlice } from "../Api/Api"

export interface messageFormValues {
    messageBody: string
 }

export const AiSlice= ApiSlice.injectEndpoints({
    endpoints: builder=> ({
       
        
         getAIresponse :  builder.mutation({
            query: (body: messageFormValues) => ({
              url: "/generate",
              method: "POST",
              body,
             
            }),
         
            invalidatesTags: ['Message'], 
          }),
    })
})

export const {
    useGetAIresponseMutation, 
}=AiSlice