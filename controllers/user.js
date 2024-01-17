import { userModel } from "../models/user.js";

export const addUser = async (req, res) => {
  let { email, password, userName } = req.body;
  if (!email || !password || !userName)
    return res
      .status(404)
      .json({
        type: "missing parameters",
        message: "please send email user name and password",
      });
  try {
    const sameUser = await userModel.findOne({ email: email });
    if (sameUser)
      return res
        .status(409)
        .json({
          type: "same user",
          message: "user with such email already exists",
        });
    let newUser = new userModel({ email, password, userName });
    await newUser.save();
    return res.json(newUser);
  } catch (err) {
    res
      .status(400)
      .json({ type: "invalid operation", message: "cannot add user" });
  }
};
export const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password)
    return res
      .status(404)
      .json({
        type: "missing parameters",
        message: "please send email user name and password",
      });
  try {
    const user = await userModel.findOne({ email: email, password });
    if (!user)
      return res
        .status(404)
        .json({ type: "no user", message: "one or more details are invalid" });
    user.password = "*****";
    return res.json(newUser);
  } catch (err) {
    res
      .status(400)
      .json({ type: "invalid operation", message: "cannot sign in user" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    let allUsers = await userModel.find({}, "-password");
    
    res.json(allUsers);
  
  } catch (err) {
    res
      .status(400)
      .json({ type: "invalid operation", message: "cannot get all user" });
  }
};
