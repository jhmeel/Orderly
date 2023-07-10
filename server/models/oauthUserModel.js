import mongoose, { Schema } from "mongoose";

import Config from "../config.js";
const sys_name = Config.NAME;

const OAuthUserSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: [true, "role is required."],
  },
  bio: {
    type: String,
    maxlength: 300,
    default: "Welcome to my profile🤗",
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goods",
    },
  ],
  subscriptionDue: Boolean,
  subscriptionDueDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OAuthUser = mongoose.model("OAuthUser", OAuthUserSchema);
export default OAuthUser;
