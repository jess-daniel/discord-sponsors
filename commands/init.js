module.exports = {
  name: 'init',
  description: 'Run the init command first to setup the bot',
  execute(message, args) {
    if (!message.guild) {
      message.reply("You must use the '_init' command in the server");
    }
    // checks that the bot can access guild data
    if (!message.guild.available) {
      message.reply('This server is not available');
    }

    // send sync 1 time
    message.channel.send('_sync');

    const runSync = (message) => {
      message.channel.send('_sync');
    };

    // interval set to 5 minutes
    const interval = 1000 * 60 * 5;

    // runs sync command at set interval
    message.client.setInterval(runSync, 10000, message);
  },
};
