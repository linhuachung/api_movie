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
        .send("Vui lòng nhập tài khoản hoặc mật khẩu");
    const user = await getUserByUserName(userName);
    if (!user)
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("Tài khoản không không hợp lệ");
    const checkPassword = bcryptjs.compareSync(password, user.password);
    if (!checkPassword)
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("Mật khẩu không hợp lệ");
    const token = generateToken(user);
    res.status(RESPONSE_CODE.OK).send({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      avatar: user.avatar,
      AccessToken: token,
    });
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
      return res
        .status(400)
        .send("Tài khoản không hợp lệ, xin vui lòng nhập lại tài khoản");
    if (!emailValidation.test(newUser.email))
      return res
        .status(400)
        .send("Email không hợp lệ, vui lòng nhập lại Email");
    if (newUser.password.length < 4 || newUser.password.trim() === "")
      return res
        .status(400)
        .send("Mật khẩu không hợp lệ, xin vui lòng nhập lại mật khẩu");
    newUser.password = hashPassword;
    const userList = await getListUser();

    const index = userList.findIndex(
      (user) => user.userName === newUser.userName
    );

    if (index === -1) {
      const user = await registerUser(newUser);
      res
        .send({
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          avatar: user.avatar,
        })
        .status(RESPONSE_CODE.OK);
    } else
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("Tài khoản đã tồn tại, vui lòng nhập tài khoản khác");
  } catch (error) {
    console.log(error);
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = {
  authRouter,
};
