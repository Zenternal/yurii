const Discord = require("discord.js");
const fs = require("fs");
const db = require("better-sqlite3")("data/db.sqlite");
const config = require("../config.json");
serverData = db.prepare('SELECT * FROM serverdata WHERE server_id=?');
module.exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author}, you lack the permission: **Manage Server**`);

  serverId = message.guild.id;
  const row = serverData.get(serverId);
  let prefixes = JSON.parse(fs.readFileSync("data/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  if(!row){
    insertServer = db.prepare(`insert into serverdata (server_id) values(?)`).run(serverId);
    const row = getServerData.get(serverId);
    console.warn(`[!] discord server ${serverId} has changed a config for the first time! A new serverdata record has been made (ID = ${row.id})`);
  }

  if(!args[0]){
    let cEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle(`⚙️ ${message.guild.name}'s Auto Moderator`)
    .addField(`**Anti Invite**`,
    `🔧 Anti Invite: **${row.am_anti_invite}**
    *${prefix}automod antiinvite <0/1>*
    *0 = false   1 = true*
    `, true)
    .addBlankField(true) 
    .addField(`**Max Mentions**`,
    `🔧 Max Mentions: ${row.am_max_mentions}
    *${prefix}automod maxmentions <number>*
    *type off if you want to disable it*
    `, true)
    .setFooter(`requested by ${message.author.tag} | yurii.pw`);

    message.channel.send(cEmbed);
  }else if(args[0] === "antiinvite"){
    if(!args[1])
      return message.channel.send("<:sadcat:665710784759857171> please specify 0 or 1");
    
    if(!(args[1] == "0" || args[1] == "1"))
      return message.channel.send("<:sadcat:665710784759857171> please specify 0 or 1");

    updateServer = db.prepare(`update serverdata SET am_anti_invite = ? WHERE server_id = ${serverId}`).run(args[1]);
    if(args[1] === "0"){antiinvite = "false"}
    if(args[1] === "1"){antiinvite = "true"}
    message.channel.send(`set **Anti Invite** to ${antiinvite}`) 
  }else if(args[0] === "maxmentions"){
    if(!args[1])
      return message.channel.send("<:sadcat:665710784759857171> please specify a number");
    maxCount = parseInt(args[1], 10);

    if(!maxCount)
      return message.channel.send("<:sadcat:665710784759857171> please specify a number");

    updateServer = db.prepare(`update serverdata SET am_max_mentions = ? WHERE server_id = ${serverId}`).run(args[1]);
    message.channel.send(`set **Max Mentions** to ${args[1]}`) 
  }


}

module.exports.info = {
  name: "automod",
  aliases: ["am"]
}
