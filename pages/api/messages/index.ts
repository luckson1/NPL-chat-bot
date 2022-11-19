import { NextApiRequest, NextApiResponse } from "next";
import { createMessage, getMessages } from "../controllers/messages";

export default async function hundler(req: NextApiRequest, res: NextApiResponse) {
const {method}=req
switch (method) {
    case "GET":
        getMessages(req, res)
        break;
    case "POST": 
    createMessage(req, res)
    break;
}

}