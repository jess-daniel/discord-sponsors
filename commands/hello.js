const getHumanUsers = require('../helpers/getHumanUsers');
module.exports = {
  name: 'hello',
  description: "I'm here when you need me!",
  // args: true,
  execute(message, args) {
    message.channel.send("I'm here when you need me!!");
    const humanCount = getHumanUsers(message);
    console.log('count', humanCount);
  },
};
