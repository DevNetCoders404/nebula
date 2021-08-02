const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  address: {
    type: String
  },
  mobile: {
    type: Number
  },
  website: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: [
    {
      skillname: {
        type: String,
        required: true
      },
      percent: {
        type: String,
        required: true
      }
    }
  ],
  socials: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    github: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);