const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(!message.guild.iconURL){
    iconURL = "https://cdn.discordapp.com/avatars/665701380488429589/6eb5291943aa99caf1ad092ce865b885.webp?size=128";
  }else{
    iconURL = message.guild.iconURL;
  }
  var e = message.guild.createdAt + '';
  let createdGuildTime = e.split("+0000");
  const ServerInfoEmbed = new Discord.RichEmbed()
  .setColor('#9b0949')
  .setThumbnail(iconURL)
  .setTitle(`${message.guild.name} Server Information`)
  .setDescription(`🔹 Server ID: **${message.guild.id}**
  🔹 Owner: **${message.guild.owner.user.tag}**
  🔹 Created: **${createdGuildTime[0]}**
  🔹 Region: **${message.guild.region}**
  🔹 Channels: **${message.guild.channels.size}**
  🔹 Total Members: **${message.guild.memberCount}**
  `)
  .setFooter(`requested by ${message.author.tag} | yurii.pw`);
  message.channel.send(ServerInfoEmbed)
}

module.exports.info = {
  name: "serverinfo",
  aliases: ['serverinfo']
}