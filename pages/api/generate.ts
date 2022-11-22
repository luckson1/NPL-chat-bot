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
    
  
  Human: ${message} 
  AI: ` ;
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
      stop: [" Human:", " AI:"],
    });
const result= completion.data.choices[0].text 


    const session = await (getSession({req})) as userSession
   const   creator= session?.id ?? session?.sub
   const ai=true
    const message = await Message.create({ messageBody: result,   creator , ai, creatorName:" AI"});
    res.status(200).json(message);
    res.end()
  } catch (error) {
    res.json(error);
  }
};
export default response;
