const { response } = require('express');
const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');

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

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('contactNo', 'Enter valid number').isMobilePhone().isLength({ min: 10 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { website, status, address, contactNo } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (address) profileFields.address = address;
    if (contactNo) profileFields.contactNo = contactNo;
    if (status) profileFields.status = status;

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
  }
);

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
  const { socials, website } = req.body;

  // Build profile object
  const profileFields = {};
  if (website) profileFields.website = website;
  if (socials) profileFields.socials = {};

  if (socials.facebook) profileFields.socials.facebook = socials.facebook;
  if (socials.twitter) profileFields.socials.twitter = socials.twitter;
  if (socials.github) profileFields.socials.github = socials.github;
  if (socials.linkedin) socials.linkedin = socials.linkedin;

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
    const profiles = await Profile.find().populate('user', ['name', 'avatar', 'email']);
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

module.exports = router;
