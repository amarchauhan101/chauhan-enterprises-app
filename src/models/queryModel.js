import mongoose, { mongo } from "mongoose";
// import { string } from "zod";

const QueryModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    default:""
  },
  status: {
    type: String,
    enum: ["pending", "answered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Query = mongoose.models.QueryModel || mongoose.model("QueryModel", QueryModel);

export default Query;