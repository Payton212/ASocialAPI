import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
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
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
userSchema
    .virtual("friendCount")
    .get(function () {
    return `${this.friends.length}`;
});
const User = model("user", userSchema);
export default User;
