import React from "react";
import { AddChatForm } from "./AddChartForm";


export const AddChat = () => {
  return (
    <div className="bg-[#1B2430] shadow-2xl h-24 w-full md:w-11/12 flex flex-col  pt-7 items-center gap-3 m-auto mt-5 rounded-lg">
      <AddChatForm />
    </div>
  );
};
