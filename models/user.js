import Joi from "joi";
import mongoose from "mongoose";

const minimalTreesSchema = mongoose.Schema({
  name: String,
});

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  email: { type: String, unique: false },
  trees: [minimalTreesSchema],
});

export const userModel = mongoose.model("users", userSchema);

export const userValidator = (_user) => {
  const userValidationSchema = Joi.object({
    userName: Joi.string().min(1).max(5).required(),
  });

  return userValidationSchema.validate(_user);
};
