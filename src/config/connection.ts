import mongoose from 'mongoose';


mongoose
  .connect("mongodb://localhost:27017/thoughtsAndReactions")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default mongoose.connection;
