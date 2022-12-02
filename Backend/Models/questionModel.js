import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  votes: { type: Number },
  content: { type: String, required: true },
  image: { type: String },
});

const questionModel = mongoose.model("question", questionSchema);

export default questionModel;
