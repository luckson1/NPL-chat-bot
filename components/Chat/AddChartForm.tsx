import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { messageFormValues, useCreateMessageMutation } from "../../redux/slices/messagesSlices";
import { useGetAIresponseMutation } from "../../redux/slices/Aislices";


const errorSchema = Yup.object().shape({
  messageBody: Yup.string().required("Name is Required"),
});
export const AddChatForm = () => {
  const [createMessage, {isError, isLoading, isSuccess}]= useCreateMessageMutation()
  const [getAiResponse, ]= useGetAIresponseMutation()

  //handle adding task
  const addMessageHandler = async (values: messageFormValues) => {
await createMessage(values)
await getAiResponse(values)
  };
  const formik = useFormik({
    initialValues: {
      messageBody: "",

    },

    onSubmit: (values, { resetForm }) => {
      addMessageHandler(values);
      resetForm({ values: {
        messageBody: ""
      }});
    },
    validationSchema: errorSchema,
  });


  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-row flex-wrap gap-1 md:gap-2 w-11/12"
    >
      <input
        className=" w-6/12 md:w-8/12 h-7 rounded-lg px-2 py-5 bg-inherit border-solid border-[1px] text-slate-50"
        type="text"
        id="messageBody"
        onChange={formik.handleChange("messageBody")}
        onBlur={formik.handleBlur("messageBody")}
        value={formik.values.messageBody}
        placeholder="Enter a message"
      />
      <button className="px-4 py-2 bg-violet-300 rounded-lg" type="submit" >Add Message</button>
    </form>
  );
};
