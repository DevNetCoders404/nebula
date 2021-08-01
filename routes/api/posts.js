const express = require('express');
const router = express.Router();
const { check, validatonResult, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Users = require('../../models/Users');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [auth, check('text', 'Text is required').not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await Users.findById(req.user.id).select('-password');

    const newPost = new Post({
      text: req.body.text,
      code: req.body.code,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts
// @desc    Get all post
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    delete post by ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (posts.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User not authorized' });
    }

    await posts.remove();
    res.json({ msg: 'Post Removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    like a post by ID
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Checks if the post has already been liked
    if (posts.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    posts.likes.unshift({ user: req.user.id });

    await posts.save();

    res.json(posts.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    unlike a post by ID
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Checks if the post has already been liked
    if (posts.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post has not yet liked' });
    }

    // Get remove index
    const removeIndex = posts.likes.map((like) => like.user.toString()).indexOf(req.user.id);

    posts.likes.splice(removeIndex, 1);

    await posts.save();

    res.json({ msg: 'Post disliked' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Add a comment
// @access  Private
router.post(
  '/comment/:id',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await Users.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComments = {
        text: req.body.text,
        code: req.body.code,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComments);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:commentid
// @desc    delete comment by ID
// @access  Private
router.delete('/comment/:id/:commentid', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // pull out comment
    const comment = posts.comments.find((comment) => comment.id === req.params.commentid);

    // Make sure comment exist
    if (!comment) {
      return res.status(404).json({ msg: ' Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User not authorized' });
    }

    const removeIndex = posts.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    posts.comments.splice(removeIndex, 1);

    await posts.save();

    res.json(posts.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
