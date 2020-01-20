const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const m = await message.channel.send("Ping...");
  m.edit(`🏓 **Pong!** ${m.createdTimestamp - message.createdTimestamp}ms.\n Discord's API latency is ${Math.round(client.ping)}ms`);
}

module.exports.info = {
  name: "ping",
  aliases: ['ping']
}