const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.set("toJSON", {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.password;
    },
});

userSchema.plugin(uniqueValidator, {message: "Username already in use."});

const User = mongoose.model("user", userSchema);

module.exports = User;