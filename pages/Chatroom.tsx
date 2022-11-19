import React from "react";
import { AddChat } from "../components/Chat/AddChat";
import { MessageBody } from "../components/Chat/MessageBody";

const ChatRoom = () => {
  return (
    <>
      <div className="bg-[#42464D] w-screen h-screen mt-8 pl-0 pr-3 md:px-8 py-8 flex flex-col">
        <MessageBody />
        <AddChat />
      </div>
    </>
  );
};
export default ChatRoom;
