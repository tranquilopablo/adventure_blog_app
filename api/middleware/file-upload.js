const multer = require('multer');

const fileUpload = multer({
  storage: multer.memoryStorage(),
});

module.exports = fileUpload;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     // cb(null, "myname.jpg")
//     // cb(null, 'black-2.jpg');
//     cb(null, req.body.name);
//   },
// });
