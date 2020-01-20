const Discord = require("discord.js");
const superagent = require('superagent')

module.exports.run = async (client, message, args) => {

  if (!message.channel.nsfw)
    return message.channel.send(`<:sadcat:665710784759857171> This isn't an NSFW channel`)
    
  superagent.get('https://nekobot.xyz/api/image')
  .query({ type: 'pussy'})
  .end((err, res) => {
    const NSFWEmbed = new Discord.RichEmbed()
    .setColor('#9b0949')
    .setImage(res.body.message)
    .setTitle(`pussy ;]`)
    .setFooter(`requested by ${message.author.tag} | yurii.pw`);
    message.channel.send(NSFWEmbed);
  });
}

module.exports.info = {
  name: "pussy",
  aliases: [],
}
