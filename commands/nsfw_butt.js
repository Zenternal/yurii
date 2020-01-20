const Discord = require("discord.js");
const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args) => {

  if (!message.channel.nsfw)
    return message.channel.send(`<:sadcat:665710784759857171> This isn't an NSFW channel`)
    
  var random = [Math.floor(Math.random() * 11000)];
  const res = await snekfetch.get(`http://api.obutts.ru/butts/${random}`);
  const preview = res.body[0]["PREVIEW".toLowerCase()];
  const NSFWEmbed = new Discord.RichEmbed()
  .setColor('#9b0949')
  .setImage(`http://media.obutts.ru/${preview}`)
  .setTitle(`butts ;]`)
  .setURL(`http://obutts.ru/`)
  .setFooter(`requested by ${message.author.tag} | yurii.pw`);
  message.channel.send(NSFWEmbed);
}

module.exports.info = {
  name: "butt",
  aliases: ['ass'],
}
