const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  const deleteCount = parseInt(args[0], 10);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author}, you lack the permission: **Manage Messages**`)
    if (!args[0] || args[0 == "help"]) return message.channel.send(`<:sadcat:665710784759857171> ${message.author}, you must input a number.`);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete.");
   
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

    const purgeEmbed = new Discord.RichEmbed()
      .setDescription('[View Here](https://yurii.pw/purgedchat/placeholderDBid)')
      .setURL('https://yurii.pw/purgedchat/placeholderDBid');

    let purgeChannel = message.guild.channels.find(`name`, "chat-logs");
    if(!purgeChannel) return message.channel.send("Can't find chat-logs channel.");
    message.channel.send(`<:thurston:666346129859805195> **You\'ve removed ${deleteCount} messages.**`)
    purgeChannel.send(`<:modclearmessages:666371547795292161> **${deleteCount}** messages has been removed from ${message.channel} by **${message.member.displayName}** (${message.member.id})`);
    purgeChannel.send(purgeEmbed);

  }
              
module.exports.info = {
    name: "purge",
    aliases: ['clean'],
} 