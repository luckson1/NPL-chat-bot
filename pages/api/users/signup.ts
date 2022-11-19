import { NextApiRequest, NextApiResponse } from "next";
import { createUser, getUser } from "../controllers/users";

export default async function hundler(req: NextApiRequest, res: NextApiResponse) {
const {method}=req
switch (method) {
    case "POST":
        createUser(req, res);

}
}