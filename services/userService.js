const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const { response } = require("express");

async function login({ username, password }, callback) {
    const user = await User.findOne({ username });

    if(user != null) {
        if(bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(user);
            return callback(null, {...user.toJSON(), token});
        }
        else {
            return callback({
                message: "Invalid Username/Passord!"
            });
        }
    }
    else {
        return callback({
            message: "Invalid Username/Passord!"
        });
    }
}

const findAccount = async (data) => {
    if(data){
        const {username} = data;
        return await User.findOne({
            username: username,
        })
    }
    return null
}

async function register(params, callback) {
    const user = new User(params);
    user.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

module.exports = {
    login,
    register,
    findAccount,
};