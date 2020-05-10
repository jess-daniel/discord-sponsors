require('dotenv').config();

// imports
const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

// Create the client
const Client = new Discord.Client();

// Creates a new command collection
Client.commands = new Discord.Collection();

// reads command files and excludes non-js files
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

// Iterates over files and imports file and adds command to collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  Client.commands.set(command.name, command);
}

// logs when bot is connected
Client.once('ready', () => {
  console.log('Bot is running...');
});

// main message handler for the bot
Client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!Client.commands.has(commandName)) return;

  const command = Client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(
      `You didn't provide any arguments, ${message.author}!`
    );
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Problem executing that command!');
  }
});

// logs bot into discord
Client.login(process.env.TOKEN);
