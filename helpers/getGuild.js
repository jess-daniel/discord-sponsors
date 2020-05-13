const Guild = require('../Models/guildModel');

const getGuild = async (guildID) => {
  try {
    const guild = await Guild.findOne({ guildId: guildID });
    return guild;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getGuild;
