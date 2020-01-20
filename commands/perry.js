const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.channel.send(`
  On March 1, 2019, Perry the Platypus was gunned down in the streets of Venezuela by a drug cartel. Perry was later avenged by Heinz Doofenshmirtz, who eradicated the cartel with his de-cartel-inator ™.
  `)
}

module.exports.info = {
  name: "perry",
  aliases: ['perry?', 'whateverhappenedtoperry', 'whathappenedtoperry'],
}