var db = require("../models");
var User = db.user;

var addUser = async (req, res) => {
  try {
    const ajay = await User.create(req.body);

    res.status(201).json({
      message: "User is created successfully",
      data: ajay.toJSON(),
    });
    var data = [req.body];
    console.log(data.length);
  }catch (error) {
    console.log(error);
    res.json({error:error})
  }
};

var bulkAddUser = async (req, res) => {
  var postData = req.body;
  if (Array.isArray(postData) && postData.length > 1) {
    const ajay = await User.bulkCreate(postData);
    res
      .status(201)
      .json({ message: "users are created successfully", data: ajay });
  } else {
    res.status(422).json({ message: "please insert in array" });
  }
};

var getUsers = async (req, res) => {
  const ajay = await User.findAll();
  res
    .status(200)
    .json({ message: "all users are fetched successfully", data: ajay });
};

var getUserById = async (req, res) => {
  var data = {};
  var status = "";
  const ajay = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (ajay == null) {
    status = 404;
    data = {
      message: `user with id:${req.params.id} is not found`,
      data: null,
    };
  } else {
    status = 200;
    data = {
      message: `user with id:${req.params.id} is fetched successfully`,
      data: ajay,
    };
  }
  res.status(status).json(data);
};

var updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const ajay = await User.update(
    {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      user_email_verified: null,
      password: userData.password,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  if (ajay == 1) {
    res.status(200).json({ message: "User updated", data: ajay });
  } else {
    res.status(404).json({ message: "User not found", data: userId });
  }
};

var deleteUser = async (req, res) => {
  try {
    console.log("Deleting user with ID:", req.params.id);

    const rowsDeleted = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: "User not found", data: req.params.id });
    }

    res.status(200).json({ message: "User deleted", data: req.params.id });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

var queryUser = async (req, res) => {
  const user1 = await User.findAll();
  res.send({ user1 });
};

module.exports = {
  addUser,
  bulkAddUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  queryUser,
};
