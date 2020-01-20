const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const HelpEmbed = new Discord.RichEmbed()
  .setColor('#9b0949')
  .setTitle('📬')
  .setDescription('https://yurii.pw/commands')
  .setFooter(`requested by ${message.author.tag} | yurii.pw`);
  message.channel.send(HelpEmbed)
}

module.exports.info = {
  name: "help",
  aliases: ['help'],
}