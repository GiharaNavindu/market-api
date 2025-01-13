import mongoose from "mongoose";
const { Schema, ObjectId, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 64,
    },
    role: {
      type: [String],
      default: ["Buyer"],
      enum: ["Buyer", "Seller", "Author", "Admin"],
    },
    photo: {
      type: String, // Assuming this is a URL to the photo
      default: "",
    },
    logo: {
      type: String, // Assuming this is a URL to the logo
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    enquiredProperties: [{ type: ObjectId, ref: "Ad" }],
    wishlist: [{ type: ObjectId, ref: "Ad" }],
    about: {
      type: String,
      default: "",
    },
    location: {
      type: { type: String, enum: ['Point'], required: true }, // Example for 2dsphere
      coordinates: { type: [Number], required: true },
    },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

export default model("User", userSchema);
