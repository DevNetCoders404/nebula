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
      'avatar'
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
// @desc    Create and Update user profile
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { website, status, skills, socials } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (website) profileFields.website = website;
    if (status) profileFields.status = status;

    if (skills) profileFields.skills = skills;

    // Build social object
    profileFields.socials = {};
    if (socials.facebook) profileFields.socials.facebook = socials.facebook;
    if (socials.twitter) profileFields.socials.twitter = socials.twitter;
    if (socials.github) profileFields.socials.github = socials.github;
    if (socials.linkedin) profileFields.socials.linkedin = socials.linkedin;

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

// @route   GET api/profile/
// @desc    Get all profile
// @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
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
      'avatar'
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
