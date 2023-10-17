import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../helpers/generateTokenAndSetCookie.js";

const signUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // const user = await User.findOne({ username, email });
    // if (user) return res.status(401).json({ error: "User Already Exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    // res.status(201).json({ message: "User created successfully" });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(404).json({ error: "Invalid user Data" });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const isPassword = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPassword) {
      return res.status(403).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(404).json({ error: "Username or Password is required" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export { signUp, signIn, logout };
