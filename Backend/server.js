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
  //the email && password is also coming from the users local storage in order to know the user who uploaded the question.
  //while the user will manually give the content, tags, && image
  //askedOn gives us the date a user upload a question
  //the author is the user which we get after check the email && password

  const { content, image, tags, email, password } = req.body;

  const author = await User.findOne({ email, password });

  if (author) {
    const question = await questionModel.create({
      content,
      image,
      author: poster,
      askedOn: new Date(),
      tags,
    });
    res.send(question);
  } else {
    res.json("this user does not exist");
  }
});

app.post("/api/answerquestion", async (req, res) => {
  //the email && password is also coming from the users local storage in order to know the user who is answering a question.
  //the questionId is used to know the specific question the user is answering.
  const { email, password, questionId, content, image } = req.body;

  const poster = await User.findOne({ email, password });

  if (poster) {
    const answer = await questionModel.updateOne(
      { _id: questionId },
      { $push: { answer: [{ content, image, poster }] } }
    );
    res.json(answer);
  } else {
    req.json("this user does not exist");
  }
});

app.post("/api/vote", async (req, res) => {
  //the questionId is used to know the specific question the user is voting for.

  const { questionId } = req.body;

  const question = await questionModel.findOne({ _id: questionId });

  question.votes++;
  question.save();
  res.json(question);
});

app.listen(5000, () => console.log("app is running on port 5000"));
