const saveGuild = require('../helpers/saveGuild');

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

    // get all channel values from collection
    const guildChannels = message.guild.channels.cache;
    const values = Array.from(guildChannels.values());

    // capture just the text channels
    let textChannels = [];
    textChannels = values.filter((channel) => {
      return channel.type === 'text';
    });

    // names of text channels
    const channelNames = textChannels.map((channel) => {
      return channel.name;
    });

    // captures guild data to save to database
    const guildData = {
      owner: message.guild.name,
      ownerId: message.guild.ownerID,
      guildId: guildId,
      guildName: message.guild.name,
      region: message.guild.region,
      partnerStatus: message.guild.partnered,
      membersCount: message.guild.memberCount,
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
