const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 26,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 26,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 26,
    trim: true,
  },
  passwordHash: {
    required: true,
  },
  passwordSalt: {
    required: true,
  },
  active: {
    required: true,
    default: false
  }
});

module.exports = mongoose.model("User", UserSchema);
