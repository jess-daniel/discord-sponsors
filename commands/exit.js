module.exports = {
  name: 'exit',
  description: 'Logs the bot out of the server',
  execute(message, args) {
    if (!message.guild.available) {
      message.reply('This server is not available');
    }

    // restricts command to guild owner
    if (message.guild.ownerID !== message.author.id) return;

    // logs client out
    message.client.destroy();
  },
};
