const mongoose = require("mongoose");

const revokedTokenSchema = mongoose.Schema(
  {
    token: { type: String, reqired: true, unique: true },
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const TokenModel = mongoose.model("revokedtoken", revokedTokenSchema);

module.exports = { TokenModel };
