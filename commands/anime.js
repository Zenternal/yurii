const Discord = require("discord.js");
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports.run = async (client, message, args) => {
  const animemessage = args.join(" ");
  if(!args)
    return message.channel.send("please put an anime name after the command")

  kitsu.searchAnime(animemessage).then(result => {
    if (result.length === 0)
      return message.channel.send(`No results found for **${animemessage}**!`);

    var fetchedanime = result[0]

    var embed = new Discord.RichEmbed()
      .setColor('#FF9D6E')
      .setAuthor(`${fetchedanime.titles.english ? fetchedanime.titles.english : animemessage} | ${fetchedanime.episodeCount} Episodes`, fetchedanime.posterImage.original)
      .setThumbnail(fetchedanime.posterImage.original)
      .setTitle(`${fetchedanime.titles.romaji}`)
      .setDescription(fetchedanime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
      .addField(`Rating`, `#${fetchedanime.ratingRank}`, true)
      .setURL(fetchedanime.url)
      .setFooter(`requested by ${message.author.tag} | yurii.pw`);

    message.channel.send(embed);
  });
};

module.exports.info = {
  name: "anime",
  aliases: ['searchanime', 'search-anime', 'findanime', 'find-anime']
}