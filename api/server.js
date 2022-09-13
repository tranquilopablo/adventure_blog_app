const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');

// app.use('/', (req, res) => {
//   console.log('this is main url!');
// });

app.use(express.json()); //  app to be able send json file in body, for example via postman. This is mainly for POST and PUT request. For GET, and DELETE dont need.

app.use('/images', express.static(path.join(__dirname, '/images')));

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    //cb(null, "myname.jpg")
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

// app.use('./api/auth', authRoute);
// app.use('./api/users', userRoute);
// app.use('./api/posts', postRoute);

app.listen('5000', () => {
  console.log('Backend is running!');
});
