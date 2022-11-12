const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');

app.use(express.json()); 
app.use('/images', express.static(path.join(__dirname, '/images')));
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT'
  );
  next();
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.listen('5000', () => {
  console.log('Backend is running!');
});
