import { Model, model, models, Schema, Types } from "mongoose";

export interface MessageType {
    messageBody: string,
    creator: Types.ObjectId
    id: string
    _id: Types.ObjectId
    ai: boolean
    image?: string
    creatorName: string
}
const messageSchema= new Schema({
    messageBody: String,
    image: String,
    creatorName: String,
    creator: {
        type: Types.ObjectId,
        ref: "User"
    },
    ai: {
        type: Boolean,
        default: false
    }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
    
)
const Message= (models.Message || model("Message", messageSchema)) as Model<MessageType>;
export default Message;