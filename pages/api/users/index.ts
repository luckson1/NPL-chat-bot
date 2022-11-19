import { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers } from "../controllers/users";

export default async function hundler(req: NextApiRequest, res: NextApiResponse) {
const {method}=req
switch (method) {
    case "GET":
        getAllUsers(req, res)
}
}