const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});
userSchema.plugin(timestamp)
const User = mongoose.model("User", userSchema);
module.exports = User