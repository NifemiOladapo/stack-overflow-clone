import mongoose from "mongoose";
// mongodb://localhost/stackoverflow

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://nifnix:wkkcz0pgNo9i0fim@cluster0.aiour8y.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
