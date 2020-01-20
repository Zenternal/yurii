const Discord = require("discord.js");
const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args) => {
  var res = await snekfetch.get("https://icanhazdadjoke.com/")
    .set("Accept", "application/json");

  message.channel.send(`<:omegalul:668947969621491734> ${res.body.joke}`)
}

module.exports.info = {
  name: "dadjoke",
  aliases: [],
}
