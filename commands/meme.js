const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports.run = async (client, message, args) => {
  const subreddits = ["dankmeme", "meme", "me_irl"];
  const random = subreddits[Math.floor(Math.random() * subreddits.length)];

  const img = await randomPuppy(random);
  const MemeEmbed = new Discord.RichEmbed()
  .setColor('#9b0949')
  .setImage(img)
  .setTitle(`/r/${random}`)
  .setURL(`https://reddit.com/r/${random}`)
  .setFooter(`requested by ${message.author.tag} | yurii.pw`);
  message.channel.send(MemeEmbed);
}

module.exports.info = {
  name: "meme",
  aliases: ['meme']
}