import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 4,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
    emailVerificationExpires: {
      type: Date,
      default: null,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function () {
  console.log("logging from user schema", this);
  console.log(this.isModified(this.password));

  if (this.isModified(this.password)) {
    console.log("yes the password is updated");
  }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
