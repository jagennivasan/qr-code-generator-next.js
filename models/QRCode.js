// // models/QRCode.js

// import mongoose from "mongoose";

// const QRCodeSchema = new mongoose.Schema({
//   qrImage: { type: String, required: true }, // Store Base64 image string
 
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.QRCode || mongoose.model("QRCode", QRCodeSchema);
///////////////////////////////////////////////////////
// models/QRCode.js
import mongoose from "mongoose";

const QRCodeSchema = new mongoose.Schema({
  qrImage: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.QRCode || mongoose.model("QRCode", QRCodeSchema);
