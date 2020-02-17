const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
  if(message.author.id !== config.bot_owner)
    return message.channel.send(`<:sadcat:665710784759857171> You must be the bot owner to run this command`)
  
  if(!args[0])
    return message.channel.send(`<:sadcat:665710784759857171> You forgot to input a guild ID. If you'd like it to be this guild, use the ID ${message.guild.id}`)

  let guild = client.guilds.get(args[0])
  const defaultChannel = guild.channels.find(c => c.permissionsFor(guild.me).has('SEND_MESSAGES'));

  try {
    try {
        defaultChannel.send(`<:thurston:666346129859805195> My developer has decided to remove me from your server.\n\zenternal#0212 is his discord tag if you wish to contact him.`)
    } catch (err) {
        guild.owner.send(`<:thurston:666346129859805195> My developer has decided to remove me from your server.\n\zenternal#0212 is his discord tag if you wish to contact him.`)
    }
    guild.leave()
    return message.channel.send(`<:thurston:666346129859805195> Successfully left the guild **${guild.name}**!`)
} catch (err) {
    return message.channel.send(`**ERROR:** \`${err}\``)
}

}

module.exports.info = {
  name: "botleave",
  aliases: ['forceleave', 'fleave', 'removeguild', 'leaveguild']
}