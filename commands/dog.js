const randomPuppy = require("random-puppy");
const Discord = require("discord.js");

// leditor.org/download

module.exports.run = async (client, message, args) => {
  const subreddits = ["puppies", "dogpictures", "puppygifs", "puppy", "PuppySmiles"];
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
  name: "dog",
  aliases: ['dog', 'dogs'],
}
