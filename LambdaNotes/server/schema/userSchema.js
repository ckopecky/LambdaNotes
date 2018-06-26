const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
})

//pre function that hashes the password

UserSchema.pre("save", function(next){
    return bcrypt
        .hash(this.password, SALT_ROUNDS)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => {
            return next(err);
        })
})

//method that will allow us to check if the password entered by client matches hashed password
UserSchema.methods.validatePassword = function(guess){
    return bcrypt.compare(guess, this.password);
}

const UserModel = mongoose.model("User", UserSchema, "users");
module.exports = UserModel
