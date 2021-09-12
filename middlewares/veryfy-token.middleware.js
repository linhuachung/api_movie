const jwt = require("jsonwebtoken");
const { RESPONSE_CODE } = require("../constants");
const { getTimeStampSecond } = require("../utils/date");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("token");
    const secretKey = "movie-api";

    const decode = jwt.verify(token, secretKey);
    if (decode.exp < getTimeStampSecond()) {
      return res.status(RESPONSE_CODE.FORBIDDEN).send("Token is expired");
    }
    const { id, userName, email, role } = decode;
    req.user = { id, userName, email, role };
    next();
  } catch (error) {
    res.status(RESPONSE_CODE.BAD_REQUEST).send("Token is not allowed");
  }
};

const authorize =
  (...arrRole) =>
  (req, res, next) => {
    const { user } = req;
    const { role } = user;
    const index = arrRole.findIndex((_role) => _role === role);
    if (index === -1)
      return res.status(RESPONSE_CODE.FORBIDDEN).send("You are not allowed");
    next();
  };

module.exports = {
  authenticate,
  authorize,
};
