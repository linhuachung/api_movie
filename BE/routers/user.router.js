const express = require("express");
const bcryptjs = require("bcryptjs");
const { RESPONSE_CODE } = require("../constants");
const {
  getListUser,
  createUser,
  deleteUser,
  getUserByUserName,
  updateUserByUserName,
  uploadAvatarUser,
} = require("../controllers/user.controllers");
const {
  authenticate,
  authorize,
} = require("../middlewares/veryfy-token.middleware");
const {
  uploadAvatarUserMiddleWare,
} = require("../middlewares/upload-images.middlewares");
const { emailValidation } = require("../utils/validation");

const userRouters = express.Router();
// lấy danh sách user
userRouters.get(
  "/getUser",
  authenticate,
  authorize("QuanTri"),
  async (req, res) => {
    try {
      const userList = await getListUser();
      res.send(userList).status(RESPONSE_CODE.OK);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

// tạo user
userRouters.post(
  "/createUser",
  authenticate,
  authorize("QuanTri"),
  async (req, res) => {
    try {
      const {
        id,
        userName,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role,
        avatar,
      } = req.body;
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
        role,
        avatar,
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
        const user = await createUser(newUser);
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
          .send("UserName has been exist");
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

// lấy user theo userName
userRouters.get(
  "/getUserByUserName=:userName",
  authenticate,
  authorize("QuanTri"),
  async (req, res) => {
    try {
      const findUserName = req.params.userName;
      if (!findUserName)
        return res.status(RESPONSE_CODE.BAD_REQUEST).send("invalid user");

      const user = await getUserByUserName(findUserName);
      if (!user)
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`user ${findUserName} is not exist`);

      res.send(user).status(RESPONSE_CODE.OK);
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

// xóa user
userRouters.delete(
  "/deleteUser/userName=:userName",
  authenticate,
  authorize("QuanTri"),
  async (req, res) => {
    try {
      const findUserName = req.params.userName;
      if (!findUserName)
        return res.status(RESPONSE_CODE.BAD_REQUEST).send("invalid user");

      const user = await getUserByUserName(findUserName);
      if (!user)
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`user ${findUserName} is not exist`);
      await deleteUser(findUserName);
      res
        .send(`User ${findUserName}  has been deleted`)
        .status(RESPONSE_CODE.OK);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

// cập nhật user

userRouters.put("/updateUserByUsername=:userName", async (req, res) => {
  try {
    const findUserName = req.params.userName;
    if (!findUserName)
      return res.status(RESPONSE_CODE.BAD_REQUEST).send("invalid user");

    const user = await getUserByUserName(findUserName);
    if (!user)
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send(`user ${findUserName} is not exist`);
    const {
      id,
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
      avatar,
    } = req.body;
    const salt = bcryptjs.genSaltSync();

    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUserUpdate = {
      id,
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
      avatar,
    };
    if (req.body.userName !== findUserName)
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("Cannot update username");

    // validation giá trị
    if (!emailValidation.test(newUserUpdate.email))
      return res.status(400).send("Email is invalid");
    if (
      newUserUpdate.password.length < 4 ||
      newUserUpdate.password.trim() === ""
    )
      return res.status(400).send("Password is invalid");
    newUserUpdate.password = hashPassword;

    await updateUserByUserName(findUserName, newUserUpdate);
    res.send("User has been update").status(RESPONSE_CODE.OK);
  } catch (error) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

// upload avatar
userRouters.post(
  "/avatar",
  authenticate,
  uploadAvatarUserMiddleWare(),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { file } = req;
      const avatarUrl = "http://localhost:3000/" + file.path;
      await uploadAvatarUser(userId, avatarUrl);
      res.send("Upload successful").status(RESPONSE_CODE.OK);
    } catch (error) {
      res.send("Upload error").status(RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    }
  }
);

// Phân trang:
userRouters.get(
  "/paginationUserList",
  authenticate,
  authorize("QuanTri"),
  async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      let result = {};
      const userList = await getListUser();

      if (endIndex < userList.length) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      result = userList.slice(startIndex, endIndex);
      res.send(result).status(RESPONSE_CODE.OK);
    } catch (err) {
      console.log(err);
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(err);
    }
  }
);

module.exports = {
  userRouters,
};
