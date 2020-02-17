const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author}, you lack the permission: **Manage Roles**`);
  
  if(!args[1])
    return message.channel.send(`<:sadcat:665710784759857171> Insufficient arguments. ( ~delrole <user> <role> )`)

  let member = message.mentions.members.first();
  let role = message.mentions.roles.first();

  roleid = args[1];

  if(message.mentions.roles.first()){
    roleid = role.id
  }

  if (!member.roles.has(roleid))
    return message.channel.send(`<:sadcat:665710784759857171> This user does not have that role`)

  let unassignedrole = message.guild.roles.get(roleid);

  try {
    await member.addRole(roleid)
      return message.channel.send(`<:thurston:666346129859805195> **${member.displayName}** has lost the role **${unassignedrole.name}**`);
  }catch (err) {
    return message.channel.send(`<:sadcat:665710784759857171> **ERROR:** ${err}`);
  }
}

module.exports.info = {
  name: "delrole",
  aliases: ['removerole', 'unassign']
}