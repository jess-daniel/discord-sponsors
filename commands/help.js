const { prefix } = require('../config.json');

module.exports = {
  name: 'help',
  description: 'Discord Sponsors is here to help you monetize your server',
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push('Here is a list of all commands');
      data.push(commands.map((command) => command.name).join(', '));
      data.push(
        `\nYou can send \`${prefix}help [command name]\ to get info on a specific command!`
      );

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply("I've sent you a DM with all commands");
        })
        .catch((error) => {
          console.error(`Could not send a helpful DM to ${message.author.tag}`);
          message.reply("I can't DM you for some reason :/");
        });
    }
    const name = args[0].toLowerCase();
    const command =
      commands.get(name) || commands.find((c) => c.includes(name));

    if (!command) {
      return message.reply('That is not a valid command');
    }

    data.push(`Name: ${command.name}`);
    if (command.description) data.push(`Description: ${command.description}`);
    if (command.usage)
      data.push(`Usage: ${prefix}${command.name} ${command.usage}`);

    message.channel.send(data, { split: true });
  },
};
