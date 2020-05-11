const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  guildName: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  partnerStatus: {
    type: Boolean,
    required: true,
  },
  membersCount: {
    type: Number,
    required: true,
  },
  textChannelNames: {
    type: [String],
    required: true,
  },
  textChannelCount: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Guild', guildSchema);
