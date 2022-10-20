const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded());
app.use(cors());
/////////////////////////////////////// Mongodb Connection  /////////////////////////////////////////////////////////////////

mongoose.connect(
  "mongodb://localhost:27017/Assignment",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("connected successfully with database");
    } else {
      console.log("error in connection " + err);
    }
  }
);

//-----------------------------------------------------------------------------------------------------------------------------
var userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  cell: { type: String },
  age: { type: String },
  createdAt: { type: String },
});
const User = mongoose.model("User", userSchema);

////////////////////////////////////////////////   APIs  ///////////////////////////////////////////////////////////////
app.get("/get/:name", (req, res) => {
  console.log("------reached");
  console.log(req.params.name);
  const name = req.params.name;
  if (name === "All") {
    User.find({}).then((users) => res.send(users));
  } else {
    User.find({ name: name }).then((users) => res.send(users));
  }
});
app.post("/add", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    console.log(user);
    user
      ? res.status(409).send({ message: "Email already exists" })
      : User.create({ ...req.body, createdAt: new Date() })
          .then((user) => {
            console.log(user);
            res.send(user);
          })
          .catch((err) => {
            res.send(err);
          });
  });
});

app.listen(8081, () => {
  console.log("Your server is running on port 8081");
});
