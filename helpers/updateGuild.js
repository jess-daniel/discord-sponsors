const Guild = require('../Models/guildModel');

const updateGuild = async (message, guild, guildID) => {
  try {
    // updates guild in DB and returns updated guild object
    const updatedGuild = await Guild.findOneAndUpdate(
      { guildId: guildID },
      guild,
      { new: true, useFindAndModify: false }
    );

    if (updatedGuild) {
      // sends new guild data to author if successfully updated
      await message.author.send(JSON.stringify(updatedGuild), { split: true });
      if (message.channel.type === 'dm') return;
      message.reply("I've sent you a DM with your info");
    }
  } catch (error) {
    console.error(`Could not send a DM to ${message.author.tag} \n ${error}`);
    message.reply("I can't DM you for some reason :/");
  }
};

module.exports = updateGuild;
