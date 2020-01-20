const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  var x = ['heads', 'tails']

  message.channel.send(`<:pepethink:668951105966833684> You flipped a coin...`).then((message)=> {
    setTimeout(function(){
      message.edit(`<:pepehappy:668951105652129832> It landed on **${x[Math.floor(Math.random()*x.length)]}**`);
    }, 2000)
  });
}

module.exports.info = {
  name: "coinflip",
  aliases: [],
}
