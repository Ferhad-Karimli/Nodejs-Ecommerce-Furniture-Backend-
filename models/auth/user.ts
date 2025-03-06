const Joi = require("joi");
const { default: mongoose, Schema } = require("mongoose");

const jwt = require("jsonwebtoken");
require("dotenv").config();

interface IUser extends Document {
  userName?: string;
  email?: string;
  password: string;
  role?: string;
  createAuthToken(): string;
}

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const registerValidate = (user: IUser) => {
  const schema = new Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().min(7).max(30).email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string(),
  });

  return schema.validate(user);
};

const loginValidate = (user: IUser) => {
  const schema = new Joi.object({
    email: Joi.string().min(7).max(30).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(user);
};

userSchema.methods.createAuthToken = function (): string {
  const decodedToken = jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_KEY as string
  );
  return decodedToken;
};

const User = mongoose.model("User", userSchema);

module.exports = { User, registerValidate, loginValidate };
