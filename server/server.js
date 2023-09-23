const express = require('express');
const mongoose = require('mongoose');

//CORS
const cors = require('cors');

//DOTENV
require('dotenv').config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Connecting to our DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('connected to DB'))
  .catch((error) => console.log(error.message));

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

//get all posts
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

//get one post
app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.send(post);
});

//create new post
app.post('/posts', async (req, res) => {
  const newPost = new Post(req.body);
  const savedPost = await newPost.save();
  console.log(savedPost)
});

//delete post
app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).send('Post Deleted');
});

app.listen(5500, () => console.log('Server started on port 5500'));
