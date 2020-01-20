const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author}, you lack the permission: **Kick Members**`);

  let member = message.mentions.members.first();
  if(!member)
    return message.channel.send(`<:sadcat:665710784759857171> ${message.author}, Please mention a valid member of this server`);
  if(!member.kickable) 
    return message.channel.send(`<:sadcat:665710784759857171> ${message.author}, I cannot kick this user! They seem to have a higher role than you.`);

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason provided";

  await member.kick(reason)
    .catch(error => message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author} I couldn't kick because of : ${error}`));
  message.channel.send(`👢 ${member.user} **has been kicked by** ${message.author} **because:** ${reason}`);
}

module.exports.info = {
  name: "kick",
  aliases: ['kick']
}