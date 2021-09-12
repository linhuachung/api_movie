const express = require("express");
const bcryptjs = require("bcryptjs");
const { RESPONSE_CODE } = require("../constants");
const {
  getUserByUserName,
  getListUser,
  registerUser,
} = require("../controllers/user.controllers");
const { generateToken } = require("../helpers/jwt.helpers");
const { emailValidation } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password)
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("userName or Password is required");
    const user = await getUserByUserName(userName);
    if (!user)
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("UserName is not exist");
    const checkPassword = bcryptjs.compareSync(password, user.password);
    if (!checkPassword)
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("Password is not exist");
    const token = generateToken(user);
    res.status(RESPONSE_CODE.OK).send({ user, token });
  } catch (error) {
    console.log({ error });
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    let { id, userName, firstName, lastName, email, phoneNumber, password } =
      req.body;
    // băm password
    const salt = bcryptjs.genSaltSync();

    const hashPassword = bcryptjs.hashSync(password, salt);

    const newUser = {
      id,
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role: "KhachHang",
      avatar: "",
    };

    // validation giá trị
    if (newUser.userName.length < 4 || newUser.userName.trim() === "")
      return res.status(400).send("Username is invalid");
    if (!emailValidation.test(newUser.email))
      return res.status(400).send("Email is invalid");
    if (newUser.password.length < 4 || newUser.password.trim() === "")
      return res.status(400).send("Password is invalid");
    newUser.password = hashPassword;
    const userList = await getListUser();

    const index = userList.findIndex(
      (user) => user.userName === newUser.userName
    );

    if (index === -1) {
      const user = await registerUser(newUser);
      res.send(user).status(RESPONSE_CODE.OK);
    } else
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("UserName has been exist");
  } catch (error) {
    console.log(error);
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = {
  authRouter,
};
