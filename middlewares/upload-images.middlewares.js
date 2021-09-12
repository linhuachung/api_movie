const multer = require("multer");
const { getTimeStampMilliSecond } = require("../utils/date");

const uploadAvatarUserMiddleWare = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/Avatars");
    },
    filename: (req, file, cb) => {
      cb(null, `${getTimeStampMilliSecond()}_${file.originalname}`);
    },
  });

  const upload = multer({ storage });
  return upload.single("avatar");
};

module.exports = {
  uploadAvatarUserMiddleWare,
};
