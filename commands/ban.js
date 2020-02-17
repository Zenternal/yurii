const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author}, you lack the permission: **Ban Members**`);

  let member = message.mentions.members.first();
  if(!member)
    return message.channel.send(`<:sadcat:665710784759857171> ${message.author}, Please mention a valid member of this server`);
  if(!member.bannable) 
    return message.channel.send(`<:sadcat:665710784759857171> ${message.author}, I cannot ban this user! They seem to have a higher role than you.`);

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason provided";

  await member.ban(reason)
    .catch(error => message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author} I couldn't ban because of : ${error}`));
  message.channel.send(`🔨 ${member.user} **has been banned by** ${message.author} **because:** ${reason}`);
}

module.exports.info = {
  name: "ban",
  aliases: []
}