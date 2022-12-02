import express from "express";
import User from "./Models/userModel.js";
import questionModel from "./Models/questionModel.js";
import connectDb from "./configureDb.js";
connectDb();

const app = express();
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { username, email, password, picture } = req.body;

  if (!username || !email || !password) {
    res.send("input the neccessary fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.send("user alredy exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    picture,
    createdOn: new Date(),
  });

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      picture: user.picture,
      createdOn: user.createdOn,
    });
  } else {
    res.json("failed to create user");
  }
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.send(user);
  } else {
    res.send("no such user exists");
  }
});

app.post("/api/deleteaccount", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    const deletedUser = await User.deleteOne({ email, password });
    res.json(deletedUser);
  } else {
    res.json("this user does not exists");
  }
});

app.post("/api/updateprofile", async (req, res) => {
  const { email, password, newUsername, newPicture } = req.body;

  const user = await User.findOne({ email, password });
  if (user) {
    user.username = newUsername;
    user.picture = newPicture;
    user.save();
    res.json(user);
  } else {
    res.json("this user you are trying to update does not exist");
  }
});

app.get("/api/questions", async (req, res) => {
  const questions = await questionModel.find();
  res.json(questions);
});

app.post("/api/uploadquestion", async (req, res) => {
  const { content, image } = req.body;

  const question = await questionModel.create({ content, image });
  res.send(question);
});

app.listen(5000, () => console.log("app is running on port 5000"));
