const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(!args.length){
    userID = message.member.id;
  }else{
    var userID = args[0];
  }
  if (message.mentions.members.first()){
    const member = message.mentions.members.first();
    userID = member.user.id;
  }
  console.log(userID);
  const member = message.guild.members.get(userID);

  var d = member.joinedAt + '';
  let joinedGuildTime = d.split("+");
  var f = member.user.createdAt + '';
  let joinedDiscordTime = f.split("+");

  const roles = member.roles
  .filter(r => r.id !== message.guild.id)
  .map(r => r).join(", ") || 'none';
  if(member.presence.game){
    var game = `🔹 Playing: **${member.presence.game.name}**`
  }else{
    var game = ``;
  }
  const UserInfoEmbed = new Discord.RichEmbed()
  .setColor('#9b0949')
  .setThumbnail(member.user.avatarURL)
  .setTitle(`${member.user.tag}'s Information`)
  .setDescription(`
  🔹 Display Name: **${member.displayName}**
  🔹 Joined Guild: **${joinedGuildTime[0]}**
  🔹 Joined Discord: **${joinedDiscordTime[0]}**
  ${game}
  🔹 Roles: **${roles}**
  `)
  .setFooter(`requested by ${message.author.tag} | yurii.pw`);
  message.channel.send(UserInfoEmbed);
}

module.exports.info = {
  name: "userinfo",
  aliases: ['userinfo']
}