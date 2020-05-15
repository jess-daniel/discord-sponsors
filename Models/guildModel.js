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
  verified: {
    type: Boolean,
    required: true,
  },
  guildName: {
    type: String,
    required: true,
  },
  guildIcon: {
    type: String,
    required: true,
  },
  guildBanner: {
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
  usersThatBoost: {
    type: Number,
    required: true,
  },
  embedEnabled: {
    type: Boolean,
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
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  syncedLast: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Guild', guildSchema);
