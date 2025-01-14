import mongoose from "mongoose";

// Define the schema for the comment model
const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Corrected from "require" to "required"
    },
    title: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps automatically
  }
);

const Category = mongoose.model("Category", categorySchema); // Fixed model name typo ("Coment" -> "Comment")

export { Category };
