import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    // const { name, email, password, phone, address } = req.body
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;
    const answer = req.body.answer;

    console.log("all inputs", req.body);

    //validation

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    //check user

    const existingUser = await userModel.findOne({ email: email });

    //exsiting  user
    if (existingUser) {
      return res.status(200).send({
        source: false,
        message: "Already registered please Login",
      });
    }

    //Register user
    const hashedPassword = await hashPassword(password);

    //save user
    const user = new userModel({
      name: name,
      email: email,
      phone: phone,
      address: address,
      password: hashedPassword,
      answer: answer,
    });
    const savedUser = await user.save();
    res.status(201).send({
      success: true,
      message: "User registered",
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration failed",
      error,
    });
  }
};
// POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    //creating token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).send({
      success: true,
      message: "logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

export const userListController = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .populate("_id")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      countTotal: users.length,
      success: true,
      message: "all users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting  all teacher",
      error: error.message,
    });
  }
};

// delete user controller
export const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params._id);

    res.status(200).send({
      success: true,
      message: "deleted user successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting user",
      error,
    });
  }
};

// forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "NewPassword is required" });
    }

    //check user

    const user = await userModel.findOne({ email, answer });
    //validation

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "wrong email or answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

//test controller
export const testController = async (req, res) => {
  try {
    res.send("protected routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
