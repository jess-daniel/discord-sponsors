const getHumanUsers = (message) => {
  // get guild member objects
  const guildMembers = message.guild.members.cache;

  // create array from member objects
  const values = Array.from(guildMembers.values());

  // get just the user object from member object
  const users = values.map((member) => {
    return member.user;
  });

  // filter out bot users from list
  const humanUsers = users.filter((user) => {
    return user.bot === false;
  });

  console.log('humans', humanUsers);

  // final human count
  const humanMemberCount = humanUsers.length;

  return humanMemberCount;
};

module.exports = getHumanUsers;
