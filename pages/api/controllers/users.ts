import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../config/dbConfig";

import Users, { UserType } from "../models/users";

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {

  const { email, password, firstName, lastName } = req.body;
  const name = `${firstName} ${lastName}`;
  await dbConnect()
      // find if user exists
      const foundUser = await Users.findOne({ email });
      if (foundUser){
      
        res.status(403).json(`User with email ${email} already exists. Please Login`);
      
      }
    ;
  
  try {
   

    const user = await Users.create({ name, password, email });
    res.status(200).json({message: "Sign Up was a success"});
  } catch (error) {
    res.json({ error });
  }
};


export const getAllUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const users = await Users.find({});

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query;

  try {
    const user = await Users.findById({ _id });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
