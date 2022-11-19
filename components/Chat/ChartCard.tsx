import React from "react";
import Image from 'next/image'
import { Message } from "./MessageBody";
export interface MessageProps {
  message: Message
}
export const ChatCard = ({ message}: MessageProps) => {


 let robotUser=message.ai
let parentClassName = robotUser
    ? "bg-[#1B2430] h-fit w-11/12 flex flex-row-reverse gap-1 mt-2 items-center mb-0"
    : "bg-[#1B2430] h-fit w-11/12 flex flex-row gap-1 mt-2 items-center";
  const childClassName = robotUser
    ? "bg-slate-400 w-56 md:w-4/12 text-slate-50 rounded-lg h-fit shadow-md"
    : "bg-violet-300 w-56 md:w-4/12 text-slate-700 rounded-lg h-fit shadow-md";
  return (
    <div className={parentClassName}>
      <div className="h-10 w-10 rounded-full  bg-slate-400 shadow-md">
    {  message?.image? <Image alt={message?.creatorName} src={message?.image} width={40} height={40} className="rounded-2xl"/>:
        <p className="text-xl text-white p-1">{ message?.creatorName}</p>}
      </div>
      <div className={childClassName}>
        <p className="text-left mx-2  text-blue-800 text-xs">
          {message?.creatorName}
        </p>
        <p className="text-left mx-2 text-sm">{message?.messageBody}</p>
      </div>
    </div>
  );
};
