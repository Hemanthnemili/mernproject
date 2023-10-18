import User from "../models/userModel.js";
import bcrypt from "bcrypt";
const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    return res.status(403).json({ error: "UnAuthorized" });
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatarUrl: req.body.avatar,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Updated Successfully", updateUser });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

export { updateUser };
