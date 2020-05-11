const Guild = require('../Models/guildModel');
const updateGuild = require('../helpers/updateGuild');

const saveGuild = async (message, guild, guildID) => {
  try {
    const currentGuild = await Guild.findOne({ guildId: guildID });

    if (currentGuild) {
      await updateGuild(message, guild, guildID);
      return;
    }

    const newGuild = new Guild(guild);

    await newGuild.save();

    await message.author.send(JSON.stringify(guild), { split: true });

    if (message.channel.type === 'dm') return;
    message.reply("I've sent you a DM with your info");
  } catch (error) {
    console.error(`Could not send a DM to ${message.author.tag} \n ${error}`);
    message.reply("I can't DM you for some reason :/");
  }
};

module.exports = saveGuild;
