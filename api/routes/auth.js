const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fileUpload = require('../middleware/file-upload');

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});
const randomId = uuidv4();

// REGISTER

router.post('/register', fileUpload.single('file'), async (req, res) => {
  

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const params = {
      Bucket: bucketName,
      Key: `${req.file.originalname}${randomId}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const workingUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${req.file.originalname}${randomId}`;

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      profilePic: workingUrl,
    });

    const user = await newUser.save();
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const validated = await bcrypt.compare(req.body.password, user.password);

      !validated && res.status(400).json('Wrong credentials!');

      const { password, ...others } = user._doc;

      res.status(200).json(others);
    } else {
      res.status(400).json('Wrong credentials!');
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
