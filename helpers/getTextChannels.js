const getTextChannels = (message) => {
  // get all channel values from collection
  const guildChannels = message.guild.channels.cache;
  const values = Array.from(guildChannels.values());

  // capture just the text channels
  const textChannels = values.filter((channel) => {
    return channel.type === 'text';
  });

  // names of text channels
  const channelNames = textChannels.map((channel) => {
    return channel.name;
  });

  return [textChannels, channelNames];
};

module.exports = getTextChannels;
