const human = require('humanize');
const bytes = require('pretty-bytes');
const Discord = require('discord.js');
const n = require('../n.json');
function randomColor() {
  var colors = ["#00F5FF", "#7FFFD4", "#008B45", "#FFD700", "#FF8000", "#FF0000", "#7FFF00", "#00BFFF", "	#000080", "#8A2BE2", "#FFB5C5", "#00FFF7", "#B120DF", "#DF2057", "#FFFFFF", "#B2FF00"];
  var colorNum = Math.floor(Math.random()*colors.length);
  return colors[colorNum];
}
exports.run = (client, message, args) => {
  if(message.author.bot) return;
  if(!message.guild) return;
  let g = message.guild;
  var embed = new Discord.RichEmbed()
  .setTitle("Server Information")
  .setDescription("Info for " + g.name)
  .setThumbnail(`${g.iconURL}`)
  .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
  .setColor(randomColor())
  .addField("Total Server Users",
    g.memberCount, true)
  .addField("Owner",
    g.owner.displayName + "#" + client.users.get(g.owner.id).discriminator, true)
  .addField("Creation Date",
    `${human.date('m-d-y', g.createdAt)}`, true)
  .addField("Guild ID",
    `${g.id}`, true)
  .setTimestamp()
  message.channel.send(embed);
}
