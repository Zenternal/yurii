// https://discordapp.com/api/oauth2/authorize?client_id=665701380488429589&permissions=8&scope=bot

const https = require('https');
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const db = require("better-sqlite3")("data/db.sqlite");

serverData = db.prepare('SELECT * FROM serverdata WHERE server_id=?');

fs.readdir("./commands/", (err, files) => {
  if(err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  console.log(`Loading ${jsfiles.length} commands`);
  jsfiles.forEach((f, i) => {
	let props = require(`./commands/${f}`);
	// console.log(`${i + 1}: ${f} loaded`);
	client.commands.set(props.info.name, props);
	props.info.aliases.forEach(alias => {
		client.aliases.set(alias, props.info.name);
	});
  });
});

const config = require("./config.json");

const activities_list = [
  '~help | ' + client.users.size + ' users', 
  "your complaints",
  "😎 chill lofi beats to study to", 
  "~help | yurii.pw"
];

client.on("ready", () => {
  https.get(`${config.url}/api/updateCount?key=${config.web_key}&users=${client.users.size}&guilds=${client.guilds.size}`);
  console.log(`\x1b[36mYurii (v1.1.0)\x1b[0m has successfully started, with ${client.users.size} users, in ${client.channels.size} channels on ${client.guilds.size} guilds.`); 
  // console.log(client.commands); \x1b[0m
  setInterval(() => {
	const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
	client.user.setActivity(activities_list[index], {type: "LISTENING"}); 
  }, 10000);
});

client.on('guildMemberAdd', member => {
  https.get(`${config.url}/api/updateCount?key=${config.web_key}&users=${client.users.size}&guilds=${client.guilds.size}`);
  console.log('\x1b[38;5;41m', `New member:\x1b[0m ${member.displayName} (${member.id}) joined: ${member.guild.name} (${member.guild.id})`)
});

client.on('error', console.error);
client.on("guildCreate", guild => {
  console.log('\x1b[38;5;41m', `New guild joined:\x1b[0m ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  https.get(`${config.url}/api/updateCount?key=${config.web_key}&users=${client.users.size}&guilds=${client.guilds.size}`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  https.get(`${config.url}/api/updateCount?key=${config.web_key}&users=${client.users.size}&guilds=${client.guilds.size}`);
});

client.on("messageDelete", async message => {
  if(message.author.id === '665701380488429589')
	return;
  serverId = message.guild.id;
  const row = serverData.get(serverId);
  if(!row) return;
  if(!row.chatlogs){
	return;
  }else{
	try{
	let chatlogChannel = message.guild.channels.find(c => c.id === `${row.chatlogs}`);
	chatlogChannel.send(`<:cross:666370341790285833> **${message.author.tag}** (${message.author.id})'s message was removed from **${message.channel}**:`)
	let embed = new Discord.RichEmbed()
	  .setDescription(message.content)
	chatlogChannel.send(embed);
  }catch(e){console.log("[ERROR]",e)}
  }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  if(oldMessage.author.id === '665701380488429589')
	  return;
  
  serverId = oldMessage.guild.id;

    // automod
    const row = serverData.get(serverId);
    if(!row){}else{
      if(row.am_max_mentions === "off"){}else{
        if (newMessage.member.hasPermission("MANAGE_MESSAGES")){}else{
          if(newMessage.mentions.members.size > row.am_max_mentions){
            newMessage.delete().then(oldMessage.channel.send(`<:sadcat:665710784759857171> you hit the mention limit`));
          }
        }
      }
      if(row.am_anti_invite === 1){
        if (newMessage.member.hasPermission("MANAGE_MESSAGES")){}else{
          if (newMessage.content.includes('discord.gg/') || newMessage.content.includes('discordapp.com/invite/')) {
            newMessage.delete().then(
              oldMessage.channel.send(`<:sadcat:665710784759857171> you can't send invite links here`),
              console.warn(`${newMessage.content} removed from ${newMessage.guild.id}`)
            )
          }
        }
      }
    }
    // automod

  if(!row.chatlogs){
  }else{
	try{
	  let chatlogChannel = oldMessage.guild.channels.find(c => c.id === `${row.chatlogs}`);
	  chatlogChannel.send(`<:minus:666370340993105920> **${oldMessage.author.tag}** (${oldMessage.author.id})'s message has been edited in **${oldMessage.channel}**:`)
	  let embed = new Discord.RichEmbed()
		.addField('from', oldMessage)
		.addField('to', newMessage);
	  chatlogChannel.send(embed);
	}catch(e){console.log("[ERROR]",e)}
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("data/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
	prefixes[message.guild.id] = {
	  prefixes: config.prefix
	};
  }
  let prefix = prefixes[message.guild.id].prefixes;

    // automod 
    // message.channel.send(`${message.mentions.members.size} users mentioned`);


    serverId = message.guild.id;
    const srow = serverData.get(serverId);
    if(!srow){}else{
      if(srow.am_max_mentions === "off"){}else{
        if (message.member.hasPermission("MANAGE_MESSAGES")){}else{
          if(message.mentions.members.size > srow.am_max_mentions){
            message.delete().then(message.channel.send(`<:sadcat:665710784759857171> you hit the mention limit`));
          }
        }
      }
      if(srow.am_anti_invite === 1){
        if (message.member.hasPermission("MANAGE_MESSAGES")){}else{
          if (message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')) {
            message.delete().then(
              message.channel.send(`<:sadcat:665710784759857171> you can't send invite links here`),
              console.warn(`${message.content} removed from ${message.guild.id}`)
            )
          }
        }
      }
    }
  
    // automod

  // userdata shit
  userId = message.author.id;
  getUserData = db.prepare('SELECT * FROM userdata WHERE discord_id=?');
  const row = getUserData.get(userId);
  if(!row){
	insertUser = db.prepare(`insert into userdata (discord_id) values(?)`).run(userId);
	const row = getUserData.get(userId);
	console.warn(`[!] discord user ${userId} has talked for the first time! A new userdata record has been made (ID = ${row.id})`);
  }
  // userdata shit


  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  let command;

  if(!message.content.startsWith(prefix)) return;

  if(client.commands.has(cmd)) {
	  command = client.commands.get(cmd);
  }else{
	  command = client.commands.get(client.aliases.get(cmd));
  }
  if(!command)
	  return;
  command.run(client, message, args);

});



client.login(config.token);
