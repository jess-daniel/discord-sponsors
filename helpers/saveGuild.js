const Guild = require('../Models/guildModel');
const updateGuild = require('../helpers/updateGuild');

const saveGuild = async (message, guild, guildID) => {
  try {
    // checks to see if guild is in DB already
    const currentGuild = await Guild.findOne({ guildId: guildID });

    if (currentGuild) {
      // updates guild if in DB
      await updateGuild(message, guild, guildID);
      return;
    }

    // creates new guild in DB if not present
    const newGuild = new Guild(guild);

    await newGuild.save();

    // sends DM to autor with guild data
    await message.author.send(JSON.stringify(guild), { split: true });

    if (message.channel.type === 'dm') return;
    message.reply("I've sent you a DM with your info");
  } catch (error) {
    console.error(`Could not send a DM to ${message.author.tag} \n ${error}`);
    message.reply("I can't DM you for some reason :/");
  }
};

module.exports = saveGuild;
