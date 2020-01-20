const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.channel.send(`👋 Hey there! I'm **Yuri**, an all purpose discord bot.
  I was created by **zenternal#0212**, as he was sick of servers having 5 different bots for something that could easily be put into one.\n
    🔗 **URL**: <https://yurii.pw/>
    🔗 **Add Me to your Server**: <https://yurii.pw/add>
    🔗 **Support Server**: <https://yurii.pw/discord>
    🔗 **Commands**: <https://yurii.pw/commands>
    
    <:POGGERS:666677598406836235> I'm currently in **${client.guilds.size}** guilds, serving **${client.users.size}** members!`)
}

module.exports.info = {
  name: "bot",
  aliases: ['bot']
}