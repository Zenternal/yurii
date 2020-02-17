const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(!args[0])
    return message.channel.send("please specify an emoji");

  const emoji = message.guild.emojis.get(args[0])
  console.log(args[0])
  if(!emoji)
    return message.channel.send("that is not a valid emoji");

  message.channel.send({files: [emoji.url]});
}

module.exports.info = {
  name: "emoji",
  aliases: ["emote", "e"]
}