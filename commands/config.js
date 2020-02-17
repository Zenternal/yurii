const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config.json");
const db = require("better-sqlite3")("data/db.sqlite");
serverData = db.prepare('SELECT * FROM serverdata WHERE server_id=?');

module.exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author}, you lack the permission: **Manage Server**`);

  let prefixes = JSON.parse(fs.readFileSync("data/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  serverId = message.guild.id;
  const row = serverData.get(serverId);
  let modlogChannel = message.guild.channels.find(c => c.id === `${row.modlogs}`);
  let chatlogChannel = message.guild.channels.find(c => c.id === `${row.chatlogs}`);
  let otherlogChannel = message.guild.channels.find(c => c.id === `${row.otherlogs}`);

  if(!modlogChannel){modlogVar = "**unset**";}
  else{modlogVar = modlogChannel;}
  if(!chatlogChannel){chatlogVar = "**unset**";}
  else{chatlogVar = chatlogChannel;}
  if(!otherlogChannel){otherlogVar = "**unset**";}
  else{otherlogVar = otherlogChannel;}

  if(!args[0]){
    let cEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle(`⚙️ ${message.guild.name}'s Config`)
    .addField(`**Server Prefix**`,
    `🔧 Prefix: **${prefix}**
    *${prefix}config prefix [value]*
    `, true)
    .addBlankField(true) 
    .addField(`**Mod Logs**`,
    `🔧 Mod Logs: ${modlogVar}
    *${prefix}config logs mod #[channel]*
    `, true)
    .addField(`**Chat Logs**`,
    `🔧 Chat Logs: ${chatlogVar}
    *${prefix}config logs chat #[channel]*
    `, true)
    .addBlankField(true) 
    .addField(`**Other Logs**`,
    `🔧 Other Logs: ${otherlogVar}
    *${prefix}config logs other #[channel]*
    `, true)
    .setFooter(`requested by ${message.author.tag} | yurii.pw`);

    message.channel.send(cEmbed);
  }else if(args[0] === "prefix"){
    // prefix start
    if(!args[1])
      return message.channel.send(`<:sadcat:665710784759857171> Please specify a prefix`);

    prefixes[message.guild.id] = {
      prefixes: args[1]
    };

    fs.writeFile("./data/prefixes.json", JSON.stringify(prefixes), (err) => {
      if (err) console.log(err)
    });

    let sEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle("⚙️ Prefix Changed")
    .setDescription(`Set to **${args[1]}**`)
    .setFooter(`requested by ${message.author.tag} | yurii.pw`);

    message.channel.send(sEmbed);
    // prefix end
  }else if(args[0] === "logs"){
    if(args[1] === "mod"){
      message.channel.send(`mod-logs`);
      sqlArg = "modlogs";
    }else if(args[1] === "chat"){
      message.channel.send(`chat-logs`);
      sqlArg = "chatlogs";
    }else if(args[1] === "other"){
      message.channel.send(`other-logs`);
      sqlArg = "otherlogs";
    }else{
      return message.channel.send(`you must specify a correct log type`);
    }
    let setchannel = message.mentions.channels.first().id;
    console.log(setchannel);
    if(!setchannel){
      return message.channel.send(`you must enter a valid channel`);
    }
    // generate new serverdata row
    serverId = message.guild.id;
    getServerData = db.prepare('SELECT * FROM serverdata WHERE server_id=?');
    const row = getServerData.get(serverId);
    if(!row){
      insertServer = db.prepare(`insert into serverdata (server_id) values(?)`).run(serverId);
      const row = getServerData.get(serverId);
      console.warn(`[!] discord server ${serverId} has changed a config for the first time! A new serverdata record has been made (ID = ${row.id})`);
    }
    // generate new serverdata row
    updateServer = db.prepare(`update serverdata SET \`${sqlArg}\` = ? WHERE server_id = ${serverId}`).run(setchannel);
    message.channel.send(`set **${sqlArg}** channel to ${setchannel}`)
  }
}

module.exports.info = {
  name: "config",
  aliases: ['config']
}