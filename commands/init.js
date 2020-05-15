const runSync = require('../helpers/runSync');

module.exports = {
  name: 'init',
  description:
    "Run the init command first to setup the bot. Run will start the bot and stop will stop the bot from syncing your server's data and remove your info from the database.",
  args: 'run, stop',
  async execute(message, args) {
    try {
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
        message.author.send(
          'The bot has been started and will automatically update your server metrics every 72 hours'
        );
        // set interval
        return (interval = runSync(message));
      } else if (args[0] === 'stop') {
        try {
          message.channel.send('Are you sure you want me to leave? [yes/no]');

          const collected = await message.channel.awaitMessages(
            (m) => m.author.id === message.author.id,
            { max: 1, time: 10000 }
          );

          // returns out of exit if user says no
          if (
            collected.first() === undefined ||
            collected.first().content.toLowerCase() === 'no'
          )
            return;
        } catch (err) {
          console.error(err);
        }

        // clear interval
        message.client.clearInterval(interval);
        // send message
        message.author.send(
          "I've stopped the bot and removed your server from our database until you re-sync"
        );
      } else {
        // if no args passed send message
        return message.channel.send(
          'You must use either run or stop with this command'
        );
      }
    } catch (error) {
      console.error(error);
    }
  },
};
