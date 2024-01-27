const mongoose = require("mongoose");

const revokedTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);

module.exports = { RevokedToken };
