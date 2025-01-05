var db = require("../models");
var User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email,
      user_email_verified: null,
      password: hashedPassword,
    });
    console.log(user);
    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in register user", error:error });
  }
};

var login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(user ,isPasswordValid);
  if (user && isPasswordValid) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({
      message: "User login successfully",
      data: { user: user, token: token },
    });
  } else {
    res.status(400).json({ message: "Error in Login" });
  }
};

var getUserById = async (req, res) => {
  try {
    console.log(req.user.userId);
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "User profile get successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

module.exports = {
  register,
  login,
  getUserById
};
