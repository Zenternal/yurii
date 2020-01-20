const Discord = require("discord.js");
const db = require("better-sqlite3")("data/db.sqlite");
serverData = db.prepare('SELECT * FROM serverdata WHERE server_id=?');

module.exports.run = async (client, message, args) => {
  serverId = message.guild.id;
  const row = serverData.get(serverId);

  //~mute @user

  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author}, you lack the permission: **Manage Messages**`);

  let tounmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tounmute) return message.channel.send(`<:sadcat:665710784759857171> ${message.author}, Please mention a valid member of this server`);
  
  let muterole = message.guild.roles.find(`name`, "muted");

  if(!tounmute.roles.find(r => r.name === "muted"))
    return message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author}, that user isnt muted`)

  await(tounmute.removeRole(muterole.id));
    message.channel.send(`<:thurston:666346129859805195> <@${tounmute.id}> has been unmuted`);
    let modlogChannel = message.guild.channels.find(c => c.id === `${row.modlogs}`);
    if(modlogChannel){
      modlogChannel.send(`<:modmute:666371547870527488> **${tounmute.displayName}** (${tounmute.id}) has been unmuted by **${message.member.displayName}** (${message.member.id})!`)
    }

}

module.exports.info = {
  name: "unmute",
  aliases: ['unmute']
}