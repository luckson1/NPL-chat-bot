import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../controllers/users";

export default async function hundler(req: NextApiRequest, res: NextApiResponse) {
const {method}=req
switch (method) {
    case "GET":
        getUser(req, res)
}
}