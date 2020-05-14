const runSync = require('../helpers/runSync');

module.exports = {
  name: 'init',
  description: 'Run the init command first to setup the bot',
  execute(message, args) {
    // checks that the message was in a guild
    if (!message.guild) {
      message.reply("You must use the '_init' command in the server");
    }
    // checks that the bot can access guild data
    if (!message.guild.available) {
      message.reply('This server is not available');
    }

    // sets the _sync interval if true or clears the interval if false
    if (args[0] === 'run') {
      // send _sync once
      message.channel.send('_sync');
      // set interval
      return (interval = runSync(message));
    } else if (args[0] === 'stop') {
      // clear interval
      message.client.clearInterval(interval);
      // send message
      message.channel.send("I've stopped the bot");
    } else {
      // if no args passed send message
      return message.channel.send(
        'You must use either run or stop with this command'
      );
    }
  },
};
