import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../config/dbConfig";
import { createMessage, getMessages } from "../controllers/messages";

export default async function hundler(req: NextApiRequest, res: NextApiResponse) {
const {method}=req
switch (method) {
    case "GET":
        await dbConnect()
        getMessages(req, res)
        break;
    case "POST": 
    await dbConnect()
    createMessage(req, res)
    break;
}

}