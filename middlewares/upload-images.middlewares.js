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

const uploadImageMovieMiddleWare = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(cb);
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype == "image/jpg"
      ) {
        file.fieldname === "banner"
          ? cb(null, "./public/images/MovieBanner")
          : cb(null, "./public/images/MoviePoster");
      } else {
        return cb(new Error("Chỉ nhận file có định dạng .png, .jpg and .jpeg")); // return req.status(400).send("Bad");
        return;
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  return upload.fields([
    {
      name: "banner",
      maxCount: 1,
    },
    {
      name: "poster",
      maxCount: 1,
    },
  ]);
};

module.exports = {
  uploadAvatarUserMiddleWare,
  uploadImageMovieMiddleWare,
};
