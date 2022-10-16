const router = require('express').Router();
// const User = require("../models/User");
const Post = require('../models/Post');
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

// CREATE NEW POST

router.post('/', fileUpload.single('file'), async (req, res) => {
  const dateNow = Date.now();

  const params = {
    Bucket: bucketName,
    Key: `${dateNow}${req.file.originalname}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);
  await s3.send(command);
  const workingUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${dateNow}${req.file.originalname}`;

  const newPost = new Post(req.body);
  newPost.photo = workingUrl;
  try {
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } // new: true - returns document after update was applied
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can update only your post!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json('Post has been deleted!');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can delete only your post!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS
router.get('/', async (req, res) => {
  // "/?uzytkownik=jane"
  // "/?kategoria=Azja"
  // "api/posts?uzytkownik=jane"

  const username = req.query.uzytkownik;
  const catName = req.query.kategoria;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({ category: catName });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
