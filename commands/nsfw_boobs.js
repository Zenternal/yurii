const Discord = require("discord.js");
const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args) => {

  if (!message.channel.nsfw)
    return message.channel.send(`<:sadcat:665710784759857171> This isn't an NSFW channel`)
    
  var random = [Math.floor(Math.random() * 11000)];
  const res = await snekfetch.get(`http://api.oboobs.ru/boobs/${random}`);
  const preview = res.body[0]["PREVIEW".toLowerCase()];
  const NSFWEmbed = new Discord.RichEmbed()
  .setColor('#9b0949')
  .setImage(`http://media.oboobs.ru/${preview}`)
  .setTitle(`boobs ;]`)
  .setURL(`http://oboobs.ru/`)
  .setFooter(`requested by ${message.author.tag} | yurii.pw`);
  message.channel.send(NSFWEmbed);
}

module.exports.info = {
  name: "boobs",
  aliases: ['boob'],
}
