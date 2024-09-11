
import mongoose from "mongoose";

const VCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: String,
  number: String,
  url: String,
  company: String,
  street: String,
  city: String,
  zip: String,
  country: String,
  
});

export default mongoose.models.VCard || mongoose.model("VCard", VCardSchema);
