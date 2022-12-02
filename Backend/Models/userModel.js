import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  picture: { type: String },
  createdOn: Date,
});

const User = mongoose.model("User", userSchema);

export default User;
