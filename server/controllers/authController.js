import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../helpers/generateTokenAndSetCookie.js";

const signIn = async (req, res) => {
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
    res.status(404).json({ error: error.message });
  }
};

export { signIn };
