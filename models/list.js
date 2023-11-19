// models/list.js
import mongoose, { Schema, models } from "mongoose";
import User from "./user"; // Import the User model
const listSchema = new Schema(
  {
    korean: String,
    meaning: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.models.List || mongoose.model("List", listSchema);

export default List;
