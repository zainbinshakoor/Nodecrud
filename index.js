const express = require("express");

const app = express();

const moongose = require("mongoose");

const cors = require("cors");
app.use(express.json());

const UserModel = require("./schema/Users.js")

app.use(cors());

moongose.connect("mongodb+srv://admin:admin@cluster0.rpnp6v2.mongodb.net/crud?retryWrites=true&w=majority");

const port =  8000;
app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save()

    res.json(user)
})
app.get("/getUsers", (request, response) => {
    UserModel.find({}, (err, result) => {
      if (!err) {
        response.json(result);
      } else {
        response.json(err);
      }
    });
  });


app.listen(port,()=>{
    console.log(`server is running on ${port} successfully`)
})