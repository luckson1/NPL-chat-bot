import { Types } from "mongoose";
import React, { useState } from "react";
import { useGetMessagesQuery } from "../../redux/slices/messagesSlices";
import { ChatCard } from "./ChartCard";
export interface Message {
  messageBody: string
  creator: string
  _id: string
  image: string,
  ai: boolean,
  creatorName: string
}

export const MessageBody = () => {
  //handle scrolling

  const [limit, setLimit] = useState(25);
  //use useLiveQuery for real time data fetching

const {data, isLoading, isSuccess, isError}=useGetMessagesQuery(undefined)

const messages=data as Message[]

  return (
    <>
  
      <div className=" bg-[#1B2430] w-full  md:w-11/12 h-5/6 rounded-l my-0 mx-auto flex flex-col items-center overflow-y-scroll gap-1 mb-0  py-4 ">
        {messages?.length
          ? messages?.map((message) => (
              <ChatCard message={message} key={message?._id} />
            ))
          : <p className="text-sky-400 ">No Messages to Display</p>}
      </div>
    </>
  );
};
