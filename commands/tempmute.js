const Discord = require("discord.js");
const ms = require("ms");
const db = require("better-sqlite3")("data/db.sqlite");
serverData = db.prepare('SELECT * FROM serverdata WHERE server_id=?');

module.exports.run = async (client, message, args) => {

  serverId = message.guild.id;
  const row = serverData.get(serverId);
  //~tempmute @user 1s/m/h/d

  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(`<:sadcat:665710784759857171> Sorry ${message.author}, you lack the permission: **Manage Messages**`);

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send(`<:sadcat:665710784759857171> ${message.author}, Please mention a valid member of this server`);
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:sadcat:665710784759857171> ${message.author}, I cannot mute this user!`);
  let muterole = message.guild.roles.find(`name`, "muted");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if(!mutetime) return message.channel.send(`<:sadcat:665710784759857171> ${message.author}, please specify a time!`);

  await(tomute.addRole(muterole.id));
  message.channel.send(`<:thurston:666346129859805195> <@${tomute.id}> has been muted for **${ms(ms(mutetime))}**`);
  let modlogChannel = message.guild.channels.find(c => c.id === `${row.modlogs}`);
  if(modlogChannel){
    modlogChannel.send(`<:modmute:666371547870527488> **${tomute.displayName}** (${tomute.id}) has been muted for **${ms(ms(mutetime))}** by **${message.member.displayName}** (${message.member.id})!`)
  }

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<:thurston:666346129859805195> <@${tomute.id}> has been unmuted!`);
    let modlogChannel = message.guild.channels.find(c => c.id === `${row.modlogs}`);
    if(modlogChannel){
      modlogChannel.send(`<:modmute:666371547870527488> **${tomute.displayName}** (${tomute.id}) has been unmuted!`)
    }
  }, ms(mutetime));


}

module.exports.info = {
  name: "tempmute",
  aliases: ['tempmute']
}