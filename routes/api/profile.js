const { response } = require('express');
const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const Post = require('../../models/Post');

const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
      'email'
    ]);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile/
// @desc    Create and Update user basic profile
// @access  Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { status, socials, skills } = req.body;
  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;

  if (status) profileFields.status = status;
  if (skills) profileFields.skills = skills;
  if (socials) profileFields.socials = socials;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // Update profile if already exists

      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create new profile

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile/skills
// @desc    Create and Update user Skill in Profile
// @access  Private

router.post('/skills', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { skills } = req.body;

  // Build profile object
  const profileFields = {};
  if (skills) profileFields.skills = skills;
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // Update profile if already exists

      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create new profile

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile/socials
// @desc    Create and Update user Socials in Profile
// @access  Private

router.post('/socials', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { socials } = req.body;

  // Build profile object
  const profileFields = {};
  if (socials) profileFields.socials = socials;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // Update profile if already exists

      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create new profile

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/
// @desc    Get all profile
// @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'username', 'avatar', 'email']);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profiles = await Profile.findOne({ user: req.params.user_id }).populate('user', [
      'name',
      'username',
      'avatar',
      'email'
    ]);

    if (!profiles) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:username
// @desc    Get profile by user name
// @access  Public

router.get('/username/:username', async (req, res) => {
  try {
    const UserProfile = await User.findOne({ username: req.params.username });

    const profiles = await Profile.findOne({ user: UserProfile._id }).populate('user', [
      'name',
      'username',
      'avatar',
      'email'
    ]);

    if (!profiles) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/
// @desc    delete profile & user
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'Profile & User deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/follow/:id
// @desc    follow user by ID
// @access  Private
router.put('/follow/:uid', auth, async (req, res) => {
  try {
    const profile1 = await Profile.findOne({ user: req.params.uid });
    const profile2 = await Profile.findOne({ user: req.user.id });

    if (!profile2) {
      console.log(profile2);
      return res.status(404).json({ msg: 'User2 not found' });
    }

    if (!profile1) {
      return res.status(404).json({ msg: 'User1 not found' });
    }

    if (profile1.followers.filter((follow) => follow.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Already follows' });
    }

    profile1.followers.unshift({ user: req.user.id });
    profile2.following.unshift({ user: req.params.uid });
    await profile1.save();
    await profile2.save();

    res.json({ msg: 'User followed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Prof not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/unfollow/:id
// @desc    unfollow user by ID
// @access  Private
router.put('/unfollow/:uid', auth, async (req, res) => {
  try {
    const profile1 = await Profile.findOne({ user: req.params.uid });
    const profile2 = await Profile.findOne({ user: req.user.id });

    if (!profile2) {
      console.log(profile2);
      return res.status(404).json({ msg: 'User2 not found' });
    }

    if (!profile1) {
      return res.status(404).json({ msg: 'User1 not found' });
    }

    if (
      profile1.followers.filter((follow) => follow.user.toString() === req.user.id).length === 0
    ) {
      return res.status(400).json({ msg: 'Not following' });
    }

    const removeIndex1 = profile1.followers
      .map((follow) => follow.user.toString())
      .indexOf(req.user.id);
    const removeIndex2 = profile2.following
      .map((follow) => follow.user.toString())
      .indexOf(req.params.id);

    profile1.followers.splice(removeIndex1, 1);
    profile2.following.splice(removeIndex2, 1);
    await profile1.save();
    await profile2.save();

    res.json({ msg: 'User unfollowed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Prof not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/stat/:id
// @desc    get stat of user
// @access  Public
router.get('/stat/:id', async (req, res) => {
  try {
    const profiles = await Profile.findOne({ user: req.params.id });
    const posts = await Post.find({ user: req.params.id });

    if (!profiles) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    if (!posts) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    let followcount = profiles.followers.length;
    let followingcount = profiles.following.length;
    let postcount = posts.length;

    res.json({ followers: followcount, following: followingcount, post: postcount });
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
