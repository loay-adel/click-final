const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = require("../models/User");

const register = async (req, res) => {
  // return res.status(200).json("Resister Done")
  const { email, password, firstName, lastName } = req.body;
  // console.log(email , password , name);
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "missing data" },
    });
  }

  const checkExistUser = await userSchema.findOne({ email });
  console.log(checkExistUser);

  if (checkExistUser) {
    return res.status(409).json({
      status: 409,
      data: { data: null, message: "user already exist" },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const registeredUser = await userSchema({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // console.log(registeredUser);

  await registeredUser.save();

  return res.status(201).json({
    status: 201,
    data: { data: null, message: "user registerd success" },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "missing data" },
    });
  }
  const loggedUser = await userSchema.findOne({ email });
  // console.log(loggedUser);
  if (!loggedUser) {
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "Email Or Password Is Wrong!" },
    });
  }
  const checkPassword = await bcrypt.compare(password, loggedUser.password);
  if (!checkPassword) {
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "Wrong Password" },
    });
  }
  console.log(checkPassword);
  const token = await jwt.sign(
    {
      email,
      firstName: loggedUser.firstName,
      lastName: loggedUser.lastName,
      role: loggedUser.role,
      _id: loggedUser._id,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
  console.log(token);
  return res.status(200).json({
    status: 200,
    data: { data: token, message: "login successful" },
  });
};

module.exports = {
  register,
  login,
};
