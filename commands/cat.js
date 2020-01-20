const randomPuppy = require("random-puppy");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const subreddits = ["JellyBeanToes", "CatsStandingUp", "Kittens", "CatReddit", "Meow_Irl",
  "Cats", "CatPics", "Kitties", "Cat", "CatGifs", "KittenGifs"];
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
  name: "cat",
  aliases: ['cats', 'kitten', 'kittens'],
}
