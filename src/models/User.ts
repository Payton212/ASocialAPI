import { Schema, Document, model, ObjectId } from "mongoose";


interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, trim: true, },
        email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, "Please enter a valid e-mail address"], },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
    },
);

const User = model("user", userSchema);
export default User;