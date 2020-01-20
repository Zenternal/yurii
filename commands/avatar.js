const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  let mentioned = message.mentions.users.first() || message.author;
  if(!mentioned)
    mentioned = message.author;

  const AvatarEmbed = new Discord.RichEmbed()
  .setColor('#9b0949')
  .setImage(mentioned.displayAvatarURL)
  .setTitle(`${mentioned.tag}'s avatar`)
  .setFooter(`requested by ${message.author.tag} | yurii.pw`);
  message.channel.send(AvatarEmbed);
}

module.exports.info = {
  name: "avatar",
  aliases: ['pfp'],
}
