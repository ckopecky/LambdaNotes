const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const database = "notesdb";



const notesController = require("./routes/notesController");
const userController = require("./routes/userController");

//mongoose connection to database
mongoose
    .connect(`mongodb://localhost/${database}`, ()=> {
        console.log("Connected to database");
    })
    
const port = process.env.POST || 5555;

//middleware

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

server.use(express.json());
server.use(cors(corsOptions));

//sanity check to be sure api works on base path
server.get("/", (req, res) => {
    res.send({api: "running on base path..."})
});

const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = "Whoo! Note-taking is awesome!"

    if(token){
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .json({ message: '"No"te-pen Sesame. Token was not decoded', err });
        } 
        next();
      });

    } 
    else{
      res.send({message: "No token for you."})
    }
  }

server.use("/api/notes", restricted, notesController)
server.use("/api/notes/:id", restricted, notesController)
server.use("/api/user", userController)

server.listen(port, () => {
    console.log(`\nServer is listening on port ${port}`);
})