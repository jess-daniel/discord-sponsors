module.exports = {
  name: 'init',
  description: 'Grabs the necessary server info and saves to the database',
  execute(message, args) {
    // TODO: check user has permission to do this

    // checks that the init command was used in a guild channel
    if (!message.guild) {
      message.reply("You must use the '_init' command in the server");
    }
    // checks that the bot can access guild data
    if (!message.guild.available) {
      message.reply('This server is not available');
    }
    const guildId = message.guild.id;
    console.log('guildID', guildId);

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
      guildName: message.guild.name,
      partnerStatus: message.guild.partnered,
      membersCount: message.guild.memberCount,
      channelNames: channelNames,
      textChannelCount: textChannels.length,
    };
    console.log(guildData);

    // sends DM and data to the owner
    return message.author
      .send(JSON.stringify(guildData), { split: true })
      .then(() => {
        if (message.channel.type === 'dm') return;
        message.reply("I've sent you a DM with your info");
      })
      .catch((error) => {
        console.error(`Could not send a helpful DM to ${message.author.tag}`);
        console.error(error);
        message.reply("I can't DM you for some reason :/");
      });
  },
};
