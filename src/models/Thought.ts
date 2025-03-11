import { Schema, Document, model } from "mongoose";
import reactionSchema from "./Reaction.js";

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: typeof reactionSchema[] ;
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [reactionSchema],
});

const Thought = model('thought', thoughtSchema);

export default Thought;