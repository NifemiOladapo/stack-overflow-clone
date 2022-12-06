import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  poster: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  content: { type: String, required: true },
  image: String,
});

const questionSchema = mongoose.Schema({
  author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  votes: { type: Number, default: 0 },
  content: { type: String, required: true },
  image: { type: String },
  answer: [answerSchema],
  tags: [String],
  askedOn: Date,
});

const questionModel = mongoose.model("question", questionSchema);

export default questionModel;
