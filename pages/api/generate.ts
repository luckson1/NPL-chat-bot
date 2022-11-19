import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Configuration, OpenAIApi } from "openai";
import dbConnect from "./config/dbConfig";
import { userSession } from "./controllers/messages";
import Message from "./models/messages";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(message: string) {
  return `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, loving, intelligent and very friendly.
    ${message}`;
}

const response = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: generatePrompt(req.body.messageBody),
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
    });
const result= completion.data.choices[0].text 

await dbConnect()
    const session = await (getSession({req})) as userSession
   const   creator= session?.id ?? session?.sub
   const ai=true
    const message = await Message.create({ messageBody: result,   creator , ai, creatorName:" AI"});
    res.json(message);
  } catch (error) {

    res.json(error);
  }
};
export default response;

// const response = async () =>
//   await openai.createCompletion({
//     model: "text-davinci-002",
//     prompt:
//       "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, loving, intelligent and very friendly.",
//     temperature: 0.9,
//     max_tokens: 150,
//     top_p: 1,
//     frequency_penalty: 0.0,
//     presence_penalty: 0.6,
//     stop: [" Human:", " AI:"],
//   });
