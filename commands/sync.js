const saveGuild = require('../helpers/saveGuild');
const getHumanUsers = require('../helpers/getHumanUsers');
const getTextChannels = require('../helpers/getTextChannels');

module.exports = {
  name: 'sync',
  description: 'Grabs the necessary server info and saves to the database',
  execute(message, args) {
    // checks that the init command was used in a guild channel
    if (!message.guild) {
      message.reply("You must use the '_sync' command in the server");
    }
    // checks that the bot can access guild data
    if (!message.guild.available) {
      message.reply('This server is not available');
    }

    // grabs guild id to check if guild is already in DB
    const guildId = message.guild.id;

    // gets the text channels and channel names
    const [textChannels, channelNames] = getTextChannels(message);

    // get server member count minus bots
    const humanCount = getHumanUsers(message);

    // captures guild data to save to database
    const guildData = {
      owner: message.guild.name,
      ownerId: message.guild.ownerID,
      guildId: guildId,
      verified: message.guild.verified,
      guildName: message.guild.name,
      guildIcon: message.guild.icon,
      guildBanner: message.guild.banner,
      region: message.guild.region,
      partnerStatus: message.guild.partnered,
      membersCount: humanCount,
      usersThatBoost: message.guild.premiumSubscriberCount || 0,
      embedEnabled: message.guild.embedEnabled,
      textChannelNames: channelNames,
      textChannelCount: textChannels.length,
      syncedLast: Date.now(),
    };
    // log guild data
    console.log(guildData);

    // save guild to database
    saveGuild(message, guildData, guildId);
  },
};
