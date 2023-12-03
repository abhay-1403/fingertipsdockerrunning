const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: "" },
    email: { type: String, required: ""  },
    password: { type: String, required: "" },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(uniqueValidator)
const UserModel = mongoose.model('users' , userSchema)

module.exports = UserModel