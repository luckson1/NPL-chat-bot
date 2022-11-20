import { NextApiRequest, NextApiResponse } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import dbConnect from "../config/dbConfig";
import Message from "../models/messages";
export interface userSession extends Session{
name: string
email: string
picture: string
sub: string
id: string
image: string
jti: string
_doc: {
  _id: string
  name: string
email: string
},
}


export const createMessage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  const { messageBody } = req.body;
  try {

    const session = await (getSession({req})) as userSession
   const   creator= session?.id ?? session?.sub
   const image=session?.image
   const creatorName=session?.name
    const message = await Message.create({ messageBody,   creator, image, creatorName });
    res.json(message);
  } catch (error) {
    res.json(error);
  }
};


export const getMessages=async(  req: NextApiRequest,
    res: NextApiResponse)=>{
   
try {
  await dbConnect()
  const session = await (getSession({req})) as userSession
  const   id= session?.id ?? session?.sub
    const messages= await Message.find({creator: id})
    res.json(messages)
} catch (error) {
    res.json(error)
}
}
