const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require('../schema/userSchema');

const generateToken = (user) => {
    const options = {
        expiresIn: '1h'
    }
    const payload = {name: user.username};
    const secret = "Whoo! Note-taking is awesome!"
    return jwt.sign(payload, secret, options);
};

const get = (req, res) => {
    res.send({api: "api/users works..."})
}

const postLogin = (req, res) => { //works
    const { username, password } = req.body
    User.findOne({username})
        .then(user => {
            if(!user){
                res.status(404).json(`username provided not in our database`)
            }
            else{
              user
                .validatePassword(password)
                .then(passwordsMatched => {
                 if(passwordsMatched){
                     const token = generateToken(user);
                     res.status(200).json({message: `Welcome, ${user.username}`, token})
                 } else{
                     res.status(400).json({Error: "Invalid password"});
                 }
                })
                .catch(err => {
                    res.status(500).json(err.message);
                });
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        });
};

const postRegister = (req, res) => { //works
    const { username, password } = req.body;
    User.create({username, password})
        .then((user)=> {
            const token = generateToken(user);
            res.status(201).json({username: user.username, token});
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
};

router.route("/") //api/user
    .get(get);

router.route("/login") //api/user/login
    .post(postLogin);

router.route("/register") //api/user/register
    .post(postRegister);

module.exports = router