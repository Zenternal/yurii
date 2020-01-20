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
  if(jsfiles.length <= 0){
	console.log("No commands to load!");
	return;
  }
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
  console.log(`Yurii (v1.0.0) has successfully started, with ${client.users.size} users, in ${client.channels.size} channels on ${client.guilds.size} guilds.`); 
  // console.log(client.commands);
  setInterval(() => {
	const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
	client.user.setActivity(activities_list[index], {type: "LISTENING"}); 
  }, 10000);
});

client.on('guildMemberAdd', member => {
  https.get(`${config.url}/api/updateCount?key=${config.web_key}&users=${client.users.size}&guilds=${client.guilds.size}`);
  console.log(`New member: ${member.displayName} (${member.id}) joined: ${member.guild.name} (${member.guild.id})`)
});

client.on('error', console.error);
client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  https.get(`${config.url}/api/updateCount?key=${config.web_key}&users=${client.users.size}&guilds=${client.guilds.size}`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  https.get(`${config.url}/api/updateCount?key=${config.web_key}&users=${client.users.size}&guilds=${client.guilds.size}`);
});

// this was left by brian //

client.on("messageDelete", async message => {
  if(message.author.id === '665701380488429589')
	return;
  serverId = message.guild.id;
  const row = serverData.get(serverId);
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
  const row = serverData.get(serverId);
  if(!row.chatlogs){
	return;
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
  } else{
	  command = client.commands.get(client.aliases.get(cmd));
  }
  if(!command)
	return;
  command.run(client, message, args);
});



client.login(config.token);
