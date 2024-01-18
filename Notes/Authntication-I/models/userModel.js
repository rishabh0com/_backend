const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
