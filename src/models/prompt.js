import mongoose, { Schema } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "prompt is rquired"],
  },
  tag: {
    type: String,
    required: [true, "prompt is rquired"],
  },
});

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", promptSchema);

export default Prompt;
